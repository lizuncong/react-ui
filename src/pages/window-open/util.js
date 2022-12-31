export const copyStyles = (sourceDoc, targetDoc) => {
    Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
        if (styleSheet.cssRules) {
            // 内联样式
            const newStyleEl = sourceDoc.createElement('style');

            Array.from(styleSheet.cssRules).forEach((cssRule) => {
                newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });

            targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) {
            // 外联样式
            const newLinkEl = sourceDoc.createElement('link');

            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
};
