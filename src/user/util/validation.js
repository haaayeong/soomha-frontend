// 아이디 유효성 검사
export const isValidUsername = (username) => {
  const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/;

  if (username === '') return "아이디를 입력하세요.";
  if (!regex.test(username)) return "아이디는 4자 이상 20자 이하의 소문자와 숫자를 포함하여 작성해주세요.";
  
  return ""; // 유효하면 빈 문자열 반환
};

// 비밀번호 유효성 검사
export const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*./,])[a-z\d!@#$%^&*./,]{4,20}$/;

  if (password === '') return "비밀번호를 입력하세요.";
  if (!regex.test(password)) return "비밀번호는 4자 이상 20자 이하의 소문자와 숫자와 특수기호를 포함해야 합니다.";
  
  return "";
};

// 비밀번호 확인 (일치 여부 검사)
export const isValidPasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
  
  return "";
};

// 이메일 유효성 검사
export const isValidEmail = (email) => {
  const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (email === '') return "이메일을 입력하세요.";
  if (!regex.test(email)) return "이메일 형식이 올바른지 확인해주세요.";
  
  return "";
};
