const LoginPage = (() => {
    return (
        <div className="login-container">
      <form className="login-form">
        <h2>Login Form</h2>
        <label>Username:</label>
        <input type="text" placeholder="Enter your username"/>

        <label>Password:</label>
        <input type="password" placeholder="Enter your password"/>

        <div className="checkbox-container">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember</label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>

    )
})
export default LoginPage;