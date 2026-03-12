#!/usr/bin/env node
/**
 * 中国亲戚称呼计算器 - 逻辑 Demo
 * 
 * 核心思路：
 * 1. 从"我"出发，每一层关系是一个节点
 * 2. 支持的关系：爸爸、妈妈、哥哥、弟弟、姐姐、妹妹、儿子、女儿、老公、老婆
 * 3. 根据路径计算最终称呼和被称呼人的性别、辈分
 */

// 基础关系定义
const RELATIONS = {
  '爸爸': { type: 'parent', gender: 'male', generation: 1, title: '父亲' },
  '妈妈': { type: 'parent', gender: 'female', generation: 1, title: '母亲' },
  '妈妈': { type: 'parent', gender: 'female', generation: 1, title: '母亲' },
  '父亲': { type: 'parent', gender: 'male', generation: 1, title: '父亲' },
  '母亲': { type: 'parent', gender: 'female', generation: 1, title: '母亲' },
  '爹': { type: 'parent', gender: 'male', generation: 1, title: '父亲' },
  '娘': { type: 'parent', gender: 'female', generation: 1, title: '母亲' },
  
  '哥哥': { type: 'sibling', gender: 'male', generation: 0, title: '兄', older: true },
  '弟弟': { type: 'sibling', gender: 'male', generation: 0, title: '弟', older: false },
  '姐姐': { type: 'sibling', gender: 'female', generation: 0, title: '姐', older: true },
  '妹妹': { type: 'sibling', gender: 'female', generation: 0, title: '妹', older: false },
  '兄': { type: 'sibling', gender: 'male', generation: 0, title: '兄', older: true },
  '弟': { type: 'sibling', gender: 'male', generation: 0, title: '弟', older: false },
  '姐': { type: 'sibling', gender: 'female', generation: 0, title: '姐', older: true },
  '妹': { type: 'sibling', gender: 'female', generation: 0, title: '妹', older: false },
  
  '儿子': { type: 'child', gender: 'male', generation: -1, title: '子' },
  '女儿': { type: 'child', gender: 'female', generation: -1, title: '女' },
  '子': { type: 'child', gender: 'male', generation: -1, title: '子' },
  '女': { type: 'child', gender: 'female', generation: -1, title: '女' },
  
  '老公': { type: 'spouse', gender: 'male', generation: 0, title: '丈夫' },
  '丈夫': { type: 'spouse', gender: 'male', generation: 0, title: '丈夫' },
  '老婆': { type: 'spouse', gender: 'female', generation: 0, title: '妻子' },
  '妻子': { type: 'spouse', gender: 'female', generation: 0, title: '妻子' },
  
  '爷爷': { type: 'grandparent', gender: 'male', generation: 2, title: '祖父' },
  '奶奶': { type: 'grandparent', gender: 'female', generation: 2, title: '祖母' },
  '外公': { type: 'grandparent', gender: 'male', generation: 2, title: '外祖父' },
  '外婆': { type: 'grandparent', gender: 'female', generation: 2, title: '外祖母' },
  '姥爷': { type: 'grandparent', gender: 'male', generation: 2, title: '外祖父' },
  '姥姥': { type: 'grandparent', gender: 'female', generation: 2, title: '外祖母' },
};

// 称呼映射表（简化版）
const TITLE_MAP = {
  // 父系
  '父亲的父亲': '爷爷',
  '父亲的母亲': '奶奶',
  '父亲的哥哥': '伯父',
  '父亲的弟弟': '叔叔',
  '父亲的姐姐': '姑妈',
  '父亲的妹妹': '姑姑',
  '父亲的哥哥的妻子': '伯母',
  '父亲的弟弟的妻子': '婶婶',
  '父亲的姐姐的丈夫': '姑父',
  '父亲的妹妹的丈夫': '姑父',
  
  // 母系
  '母亲的父亲': '外公',
  '母亲的母亲': '外婆',
  '母亲的哥哥': '舅舅',
  '母亲的弟弟': '舅舅',
  '母亲的姐姐': '姨妈',
  '母亲的妹妹': '姨妈',
  '母亲的哥哥的妻子': '舅妈',
  '母亲的弟弟的妻子': '舅妈',
  '母亲的姐姐的丈夫': '姨父',
  '母亲的妹妹的丈夫': '姨父',
  
  // 平辈
  '哥哥': '哥哥',
  '弟弟': '弟弟',
  '姐姐': '姐姐',
  '妹妹': '妹妹',
  '哥哥的妻子': '嫂子',
  '弟弟的妻子': '弟妹',
  '姐姐的丈夫': '姐夫',
  '妹妹的丈夫': '妹夫',
  
  // 子辈
  '儿子': '儿子',
  '女儿': '女儿',
  '儿子的妻子': '儿媳',
  '女儿的丈夫': '女婿',
  
  // 祖辈
  '父亲的父亲的父亲': '太爷爷',
  '父亲的父亲的母亲': '太奶奶',
  '父亲的母亲的父亲': '外太爷爷',
  '父亲的母亲的母亲': '外太奶奶',
};

class KinshipCalculator {
  constructor() {
    this.maxGeneration = 5; // 最大追溯 5 代
  }

  /**
   * 解析输入字符串，如 "爸爸的爸爸的妈妈的妹妹的女儿"
   */
  parse(input) {
    // 清理输入
    input = input.trim();
    
    // 分割关系词（支持"的"、空格、无分隔符）
    let relations = [];
    
    // 尝试用"的"分割
    if (input.includes('的')) {
      relations = input.split('的').filter(r => r.trim());
    } else {
      // 尝试匹配已知关系词
      const pattern = /(爸爸 | 妈妈 | 父亲 | 母亲 | 爹 | 娘 | 哥哥 | 弟弟 | 姐姐 | 妹妹 | 兄 | 弟 | 姐 | 妹 | 儿子 | 女儿 | 子 | 女 | 老公 | 老婆 | 丈夫 | 妻子 | 爷爷 | 奶奶 | 外公 | 外婆 | 姥爷 | 姥姥)/g;
      const matches = input.match(pattern);
      if (matches) {
        relations = matches;
      }
    }
    
    return relations;
  }

  /**
   * 计算称呼
   */
  calculate(input) {
    const relations = this.parse(input);
    
    if (relations.length === 0) {
      return { error: '未识别到有效的关系词', path: [] };
    }
    
    // 检查代数
    if (relations.length > this.maxGeneration) {
      return { 
        result: '祖宗', 
        note: `追溯了${relations.length}代，已超出计算范围`,
        path: relations 
      };
    }
    
    // 构建路径描述
    const path = relations.map(r => RELATIONS[r]?.title || r).join('的');
    
    // 查找称呼
    const title = TITLE_MAP[path];
    
    if (title) {
      return {
        result: title,
        path: relations,
        pathDescription: path
      };
    }
    
    // 尝试智能推导
    return this.derive(relations, path);
  }

  /**
   * 智能推导称呼（简化版）
   */
  derive(relations, path) {
    // 获取最后一层关系
    const lastRelation = RELATIONS[relations[relations.length - 1]];
    
    if (!lastRelation) {
      return {
        result: '未知',
        note: '无法识别最后一段关系',
        path: relations,
        pathDescription: path
      };
    }
    
    // 根据辈分和性别推导
    const totalGeneration = relations.reduce((sum, r) => {
      return sum + (RELATIONS[r]?.generation || 0);
    }, 0);
    
    let baseTitle = '';
    
    if (totalGeneration >= 2) {
      baseTitle = '祖辈';
    } else if (totalGeneration === 1) {
      baseTitle = '长辈';
    } else if (totalGeneration === 0) {
      baseTitle = '平辈';
    } else {
      baseTitle = '晚辈';
    }
    
    return {
      result: `${baseTitle}（${lastRelation.title}）`,
      note: '智能推导结果，可能不够准确',
      path: relations,
      pathDescription: path,
      generation: totalGeneration
    };
  }
}

// 测试
const calculator = new KinshipCalculator();

console.log('=== 中国亲戚称呼计算器 Demo ===\n');

const testCases = [
  '爸爸的爸爸',
  '妈妈的妈妈',
  '爸爸的哥哥',
  '妈妈的哥哥',
  '爸爸的姐姐的女儿',
  '妈妈的妹妹的儿子',
  '爸爸的爸爸的妈妈的妹妹的女儿',
  '哥哥的妻子',
  '姐姐的丈夫',
];

testCases.forEach(input => {
  const result = calculator.calculate(input);
  console.log(`输入：${input}`);
  console.log(`路径：${result.pathDescription || 'N/A'}`);
  console.log(`结果：${result.result}`);
  if (result.note) console.log(`备注：${result.note}`);
  console.log('---');
});

// 交互模式
console.log('\n=== 交互模式 ===');
console.log('输入关系链（如：爸爸的妈妈的哥哥），输入 q 退出');

// 如果是命令行直接运行，可以开启 readline
if (process.argv[1]?.includes('kinship-demo')) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const ask = () => {
    rl.question('\n请输入：', (input) => {
      if (input.toLowerCase() === 'q') {
        rl.close();
        return;
      }
      const result = calculator.calculate(input);
      console.log(`结果：${result.result}`);
      if (result.pathDescription) console.log(`路径：${result.pathDescription}`);
      if (result.note) console.log(`备注：${result.note}`);
      ask();
    });
  };
  
  ask();
}

module.exports = KinshipCalculator;
