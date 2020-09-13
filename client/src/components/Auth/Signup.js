import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from 'react-router-dom'
import { SIGNUP_USER } from "../../queries";
import Error from "../Error";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};
class Signup extends React.Component {
  state = { ...initialState };
  clearState = () => {
    this.setState({ ...initialState });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    console.log(name, "in", value);
  };
  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({data}) => {
      console.log(this.props.refetch(), "inauth");
      localStorage.setItem("token", data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/')
    });
  };
  validateForm = () => {
    const { username, password, email, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  };
  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2 className="App">SignUp</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, signupUser)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={this.handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Yur Password"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signup);
