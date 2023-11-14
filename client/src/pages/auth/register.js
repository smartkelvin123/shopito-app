import React, { useEffect, useState } from "react";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/card";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import { toast } from "react-toastify";
import { validateEmail } from "../../utilis";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../../redux/features/auth/authslice";
import Loader from "../../components/loader/loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassowrd: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, confirmPassowrd } = formData;

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const RegisterUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("all field are required");
    }
    if (password.length < 6) {
      return toast.error("password must be at least 6 characters");
    }
    if (password !== confirmPassowrd) {
      return toast.error("password do not match");
    }
    if (!validateEmail(email)) {
      return toast.error("please enter a valid email");
    }

    const userData = {
      name,
      email,
      password,
    };
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <div>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <div className={styles.formContainer}>
          <Card>
            <div className={styles.form}>
              <h2>Register</h2>
              <form onSubmit={RegisterUser}>
                <input
                  type="text"
                  placeholder="name"
                  required
                  name={"name"}
                  value={name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  placeholder="email"
                  required
                  name={"email"}
                  value={email}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="password"
                  required
                  name={"password"}
                  value={password}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="confirm password"
                  required
                  name={"confirmPassowrd"}
                  value={confirmPassowrd}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Register
                </button>
              </form>
              <span className={styles.register}>
                Alreadly have an accout? <Link to="/login">login</Link>
              </span>
            </div>
          </Card>
        </div>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width="400" />
        </div>
      </section>
    </div>
  );
};

export default Register;
