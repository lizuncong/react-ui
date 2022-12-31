import React, { memo, useRef, useMemo, useEffect } from "react";
import ReactDOM from "react-dom";
import { stringify } from "qs";
import { copyStyles } from "./util";

const WindowPortal = ({
  children,
  closeAfterBlur = true,
  onBlur,
  onClose,
  visible,
  winOptions,
}) => {
  const windowInstance = useRef(null);
  const winOptionRef = useRef(null);
  const containerEl = useMemo(() => {
    if (visible) {
      return document.createElement("div");
    }
  }, [visible]);
  winOptionRef.current = winOptions;
  useEffect(() => {
    if (!visible) {
      windowInstance.current && windowInstance.current.close();
      return;
    }
    // 默认选项
    const defaultBrowserWindowOptions = {
      transparent: true,
      backgroundColor: "#00000000",
      width: 400,
      height: 400,
      // frame: false,
      // x: 0,
      // y: 0,
      // movable: true,
      // resizable: false,
    };
    const browserwinOptions = {
      ...defaultBrowserWindowOptions,
      ...winOptionRef.current,
    };
    browserwinOptions.__portalType = "modal"; // 和主进程约定的协议，用于拦截窗口的创建
    const { x, width, y, height } = browserwinOptions;
    // 如果没有传递x和y，则打开时默认居中
    const left = x === undefined ? window.screen.width / 2 - width / 2 : x;
    let top = y === undefined ? window.screen.height / 2 - height / 2 : y;

    windowInstance.current = window.open(
      "",
      stringify(browserwinOptions),
      `left=${left},top=${top},width=${width},height=${height}`
    );
    if (!windowInstance.current) return;
    containerEl?.setAttribute("style", "width: 100%; height: 100%;");
    windowInstance.current.document.body.appendChild(containerEl);
    windowInstance.current.document.head.innerHTML = "";
    copyStyles(document, windowInstance.current.document);
  }, [visible, containerEl]);

  useEffect(() => {
    if (!windowInstance.current) return;

    const onBlurInner = () => {
      // 默认失焦关闭
      if (closeAfterBlur && windowInstance.current) {
        windowInstance.current.close();
        onClose && onClose();
      }
      if (onBlur) {
        onBlur();
      }
    };
    const onBeforeunload = () => {
      onClose();
    };
    windowInstance.current.addEventListener("blur", onBlurInner);
    windowInstance.current.addEventListener("beforeunload", onBeforeunload);
    return () => {
      if (!windowInstance.current) return;
      windowInstance.current.removeEventListener("blur", onBlurInner);
      windowInstance.current.removeEventListener(
        "beforeunload",
        onBeforeunload
      );
    };
  }, [visible, onBlur, onClose, closeAfterBlur]);
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      windowInstance.current && windowInstance.current.close();
    });
    return () => {
      windowInstance.current && windowInstance.current.close();
    };
  }, []);
  if (!visible) return null;
  return ReactDOM.createPortal(children, containerEl);
};

export default memo(WindowPortal);
