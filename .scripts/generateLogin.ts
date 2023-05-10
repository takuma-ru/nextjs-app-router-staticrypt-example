var fs = require("fs");

const login = fs.readFileSync("out/login.html", "utf8") as string;

//////////////////////////////
// 関数・変数定義
//////////////////////////////

/**
 * staticrypt を使用する上で必須のmeta
 */
const staticryptMeta = `<title>/*[|template_title|]*/0</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- do not cache this page -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />`;

/**
 * staticrypt を使用する上で必須のscript
 */
const staticryptScript = `<script>
      // these variables will be filled when generating the file - the template format is '/*[|variable_name|]*/0'
      const staticryptInitiator = /*[|js_staticrypt|]*/ 0;
      const templateError = "/*[|template_error|]*/0",
        isRememberEnabled = /*[|is_remember_enabled|]*/ 0,
        staticryptConfig = /*[|staticrypt_config|]*/ 0;

      // you can edit these values to customize some of the behavior of StatiCrypt
      const templateConfig = {
        rememberExpirationKey: "staticrypt_expiration",
        rememberPassphraseKey: "staticrypt_passphrase",
        replaceHtmlCallback: null,
        clearLocalStorageCallback: null,
      };

      // init the staticrypt engine
      const staticrypt = staticryptInitiator.init(staticryptConfig, templateConfig);

      // try to automatically decrypt on load if there is a saved password
      window.onload = async function () {
        const { isSuccessful } = await staticrypt.handleDecryptOnLoad();

        // if we didn't decrypt anything on load, show the password prompt. Otherwise the content has already been
        // replaced, no need to do anything
        if (!isSuccessful) {
          // hide loading screen
          document.getElementById("staticrypt_loading").classList.add("hidden");
          document.getElementById("staticrypt_content").classList.remove("hidden");
          document.getElementById("staticrypt-password").focus();

          // show the remember me checkbox
          if (isRememberEnabled) {
            document.getElementById("staticrypt-remember-label").classList.remove("hidden");
          }
        }
      };

      // handle password form submission
      document.getElementById("staticrypt-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const password = document.getElementById("staticrypt-password").value,
          isRememberChecked = document.getElementById("staticrypt-remember").checked;

        const { isSuccessful } = await staticrypt.handleDecryptionOfPage(password, isRememberChecked);

        if (!isSuccessful) {
          alert(templateError);
        }
      });
    </script>`;

/**
 * login.htmlからmetaタグ内の要素を取り出す（titleなど重複要素は消す）
 * @returns metaタグ内の要素
 */
const cutOutMeta = () => {
  const indexHeadStart = login.indexOf("<head");
  const indexHeadEnd = login.indexOf("</head");
  let meta = login.substring(indexHeadStart + 6, indexHeadEnd);
  /* meta.replace("<title>Create Next App</title>", "");
  meta.replace(/<meta name="viewport".*\/>/, ""); */
  return meta;
};

/**
 * login.htmlからbodyタグ内の要素を取り出す
 * @returns bodyタグ内の要素
 */
const cutOutBody = () => {
  const indexBodyStart = login.indexOf("<body");
  const indexBodyStartEnd = login.indexOf(">", indexBodyStart);
  const indexBodyEnd = login.indexOf("</body");
  return login.substring(indexBodyStartEnd + 1, indexBodyEnd);
};

/**
 * body に付与されているclassNameを取り出す
 * @returns body に付与されているclassName
 */
const cutOutBodyClassName = () => {
  const indexBodyClassStart = login.indexOf('<body class="');
  const indexBodyClassEnd = login.indexOf('">', indexBodyClassStart);
  return login.substring(indexBodyClassStart + 13, indexBodyClassEnd);
};

const cutOutScripts = () => {
  const indexHtmlEnd = login.indexOf("</html");
  const indexScriptStart = login.indexOf("<script", indexHtmlEnd);
  const indexScriptEnd = login.lastIndexOf("</script");
  return login.substring(indexScriptStart, indexScriptEnd);
};

/**
 * 独自UIで実装したログインページを出力する
 */
const generate = () => {
  const meta = cutOutMeta();
  const body = cutOutBody();
  const bodyClassName = cutOutBodyClassName();
  const scripts = cutOutScripts();

  const html = `
  <!DOCTYPE html>
  <html class="staticrypt-html">

    <head>
      ${meta}
      ${staticryptMeta}
    </head>

    <body class="staticrypt-body ${bodyClassName}">
      ${body}
      ${staticryptScript}
    </body>

  </html>
  ${scripts}
  `;

  try {
    /* fs.writeFileSync("out/login.html", text); */
    fs.writeFileSync("out/login.html", html);
    console.log("write end");
  } catch (e) {
    console.log(e);
  }
};

//////////////////////////////
// 生成
//////////////////////////////

generate();
