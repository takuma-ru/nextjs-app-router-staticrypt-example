/* eslint-disable react/jsx-no-comment-textnodes */
import { NextPage } from "next";
import style from "./page.module.scss";

const Login: NextPage = () => {
  return (
    <>
      <div id="staticrypt_loading" className="staticrypt-spinner-container">
        <div className="staticrypt-spinner"></div>
      </div>

      <div id="staticrypt_content" className="staticrypt-content hidden">
        <div className="staticrypt-page">
          <div className="staticrypt-form">
            <div className="staticrypt-instructions">
              <p className="staticrypt-title">/*[|template_title|]*/0</p>
              <p>/*[|template_instructions|]*/0</p>
            </div>

            <hr className="staticrypt-hr" />

            <form id="staticrypt-form" action="#" method="post">
              <input
                id="staticrypt-password"
                type="password"
                name="password"
                placeholder="/*[|template_placeholder|]*/0"
                autoFocus
              />

              <label
                id="staticrypt-remember-label"
                className="staticrypt-remember hidden"
              >
                <input
                  id="staticrypt-remember"
                  type="checkbox"
                  name="remember"
                  // eslint-disable-next-line react/jsx-no-comment-textnodes
                />
                /*[|template_remember|]*/0
              </label>

              <input
                type="submit"
                className="staticrypt-decrypt-button"
                value="/*[|template_button|]*/0"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
