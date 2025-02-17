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
  const trimmedEmail = email.trim(); // 공백 제거

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (trimmedEmail === '') {
    return "이메일을 입력하세요.";
  }
  if (!regex.test(trimmedEmail)) {
    return "이메일 형식이 올바른지 확인해주세요.";
  }

  return "";
};

// 닉네임 유효성 검사
export const isValidNickname = (nickname) => {
  const regex = /^[A-Za-z가-힣0-9]{2,}$/

  if (nickname === '') return "닉네임을 입력하세요.";
  if (!regex.test(nickname)) return "닉네임은 2자 이상, 특수기호는 제외해야 합니다."

  return "";
}

// 로그인 유효성 검사
export const isValidLogin = (username, password) => {
  if (username.trim() === "") return "아이디를 입력하세요.";
  if (password.trim() === "") return "비밀번호를 입력하세요.";
}
