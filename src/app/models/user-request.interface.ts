export interface UserRequest {
  uid?: string;
  secondName?: string;
  firstName?: string;
  middleName?: string;

  phoneNumber?: string;
  email?: string;

  additionalInfo?: string;
  courseId?: string;
  courseName?: string;

  deleted?: boolean;

  createDate?: any;
  updateDate?: any;
  deleteDate?: any;

  done?: boolean;
  note?: string;
}
