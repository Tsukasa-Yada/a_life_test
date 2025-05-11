export interface Agent {
  id: number;
  
  // 基本属性
  age: number;
  gender: 'male' | 'female';
  education: 'highSchoolStudent' | 'highSchool' | 'bachelorStudent' | 'bachelor' | 'masterStudent' | 'master' | 'doctorStudent' | 'doctor';
  
  // 経済状態
  income: number;
  savings: number;
  
  // 労働状態
  employed: boolean;
  skillLevel: number;
  productivity: number;
} 