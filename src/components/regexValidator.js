
const emailValidator = email=>{
    const emailRegex = /^[^\s@]+@[^/s@]+$/;
    return emailRegex.test(email)
}
const passwordValidator = password=>{
    const passwordRegex = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*?[0-9])(?=.*[#?!@$%^&*-]).{8,15}$/;
    return passwordRegex.test(password)
}