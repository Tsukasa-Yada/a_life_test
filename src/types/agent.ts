export interface Agent {
  id: number;
  
  // 基本属性
  age: number;
  gender: 'male' | 'female';
  education: 'middleSchool' | 'highSchoolStudent' | 'highSchool' | 'bachelorStudent' | 'bachelor' | 'masterStudent' | 'master' | 'doctorStudent' | 'doctor';
  
  // 居住地域
  prefecture: {
    code: string;
    name: string;
    region: string;
  };
  
  // 経済状態
  income: number;
  savings: number;
  
  // 労働状態
  employed: boolean;
  skillLevel: number;
  productivity: number;
} 