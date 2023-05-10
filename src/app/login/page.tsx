import { NextPage } from "next";
import style from "./page.module.scss";

const Login: NextPage = () => {
  return (
    <>
      <div className={style["login"]}>
        <h1>Login</h1>
      </div>
    </>
  );
};

export default Login;
