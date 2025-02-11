// 아이디 유효성 검사
export const isVaildUsername = (username) => {
  const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/;
  if(username === '') {
    alert('아이디를 입력하세요');
    return false;
  }

  if(!regex.test(username)) {
    alert('아이디는 4자 이상 20자 이하의 소문자와 숫자를 포함하여 작성해주세요')
    return false
  }

  return true;
}

// 비밀번호 유효성 검사
export const isVaildPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*./,])[a-z\d]{4s,20}$/;

  if(password === '') {
    alert('비밀번호를 입력하세요');
    return false
  }

  if(!regex.test(password)) {
    alert('비밀번호는 4자 이상 20자 이하의 소문자와 숫자와 특수기호를 포함하여 작성해주세요.')
    return false
  }

  return true;
}

// 비밀번호 확인 일치 여부 검사
export const isVaildPasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
}

// 이메일주소 유효성 검사
export const isVaildEmail = (email) => {
  const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if(email === '') {
    alert('이메일을 입력하세요');
    return false
  }

  if(!regex.test(email)) {
    alert('이메일 형식이 올바른지 확인해주세요')
    return false
  }

  return true;
}