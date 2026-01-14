export enum Permission {
  ACCESS_DASHBOARD = "access_dashboard",
  ACCESS_MATERIAL = "access_material",
  ACCESS_USER = "access_user",
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export const ROLE_PERMISSIONS = {
  [UserRole.ADMIN]: [...Object.values(Permission)],
  [UserRole.USER]: [Permission.ACCESS_DASHBOARD],
};
