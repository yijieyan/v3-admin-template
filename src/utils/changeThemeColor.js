import { ref } from "vue";
import { version } from "element-plus";
import { useLayoutStore } from "@/store/modules/layout";

const getTheme = (theme, prevTheme) => {
  const themeCluster = getThemeCluster(theme.substr(1));
  const originalCluster = getThemeCluster(prevTheme.value.substr(1));
  prevTheme.value = theme;
  return { themeCluster, originalCluster };
};

const getThemeCluster = (theme) => {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    if (tint === 0) return [red, green, blue].join(",");

    red += Math.round(tint * (255 - red));
    green += Math.round(tint * (255 - green));
    blue += Math.round(tint * (255 - blue));
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  };

  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  };

  const clusters = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
};

const getStyleElem = (id) => {
  let styleTag = document.getElementById(id);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.setAttribute("id", id);
    document.head.appendChild(styleTag);
  }

  return styleTag;
};

const getCSSString = (url, chalk) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        chalk.value = xhr.responseText.replace(/@font-face{[^}]+}/, "");
        resolve();
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
};

// 切换主题色，并记录
const prevTheme = ref("#409eff");
const chalk = ref("");
export default async function changeThemeColor(theme) {
  const { changeThemeColor } = useLayoutStore();
  const { themeCluster, originalCluster } = getTheme(theme, prevTheme);
  if (!chalk.value) {
    // const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
    const url = `/element-plus/index@${version}.css`;
    await getCSSString(url, chalk);
  }
  originalCluster.forEach((color, index) => {
    chalk.value = chalk.value.replace(
      new RegExp(color, "ig"),
      themeCluster[index]
    );
  });
  const styleTag = getStyleElem("chalk-style");
  styleTag.innerText = chalk.value;

  const systemSetting = document.querySelector("style.layout-side-setting");
  if (systemSetting) {
    let systemSettingText = systemSetting.innerText;
    originalCluster.forEach((color, index) => {
      systemSettingText = systemSettingText.replace(
        new RegExp(color, "ig"),
        themeCluster[index]
      );
    });
    systemSetting.innerText = systemSettingText;
  }

  changeThemeColor(`#${themeCluster[0]}`);
}

export async function changeThemeDefaultColor() {
  const { getSetting } = useLayoutStore();
  const defaultTheme = ref(getSetting.color.primary);
  // 判断是否修改过主题色
  defaultTheme.value.toLowerCase() !== "#409eff" &&
    (await changeThemeColor(defaultTheme.value));
}
