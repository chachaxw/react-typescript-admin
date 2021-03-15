export const PositiveIntegerReg = /^[1-9]([0-9])*$/;

export const UsernameReg = /^[0-9a-z]{5,32}$/i;

export const UrlQueryReg = /\?\S*/g;

export const DecimalReg = /^\d+(?:\.\d{0,10})?$/;

export const PhoneReg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;

export const PhoneRegSetting = /^((400-?\d{3}-?\d{4})|(0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;

export const NumberReg = /^[0-9]+$/;

export const PasswordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/;

export const FloorReg = /^(((-?\d|\d+|[A-Z]|\d+[A-Z])|(-?\d|\d+)[~～](-?\d|\d+))[ ,，]+)*((-?\d|\d+|[A-Z]|\d+[A-Z])|(-?\d|\d+)[~～](-?\d|\d+))$/;

export const MacAddressReg = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}/;

export const EmailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

export const IdCard = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

export const UUIDReg = /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/;
