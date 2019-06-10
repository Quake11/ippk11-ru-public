export interface Course {
  uid?: string;
  logo?: { url: string; path: string };
  name?: string;
  hours?: number;
  img?: { url: string; path: string };
  description?: string;
  type?: 'pp' | 'pk';
  requiredEducation?: string;

  free?: boolean;
  cost?: number;
  costInfo?: string;

  deleted?: boolean;

  createDate?: any;
  updateDate?: any;
  deleteDate?: any;

  createUserId?: string;
  updateUserId?: string;
  deleteUserId?: string;

  sort?: number;
}

export abstract class CCourse implements Course {
  public static getTypeName(type) {
    if (type === 'pp') {
      return 'Профессиональная переподготовка';
    } else if (type === 'pk') {
      return 'Повышение квалификации';
    } else {
      return '';
    }
  }
}
