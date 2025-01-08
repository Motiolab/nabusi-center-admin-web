import { getSMTDesignDesignSystem } from "@/shared";
import tokens from "@/samata-design-token/e.g.token.json"

const setCSSVariables = () => {
    const designTokens: ISMTToken = tokens;
    let styles = ':root { ';
    Object.entries(designTokens).forEach(([category, tokens]: [string, ISMTTokenValueSet]) => {
        Object.entries(tokens).forEach(([name, token]: [string, ISMTCategory]) => {
            Object.entries(token).forEach(([key, value]: [string, ISMTValue]) => {
                let cssVariableName = 'none'
                if (value.type === 'color') {
                    cssVariableName = `--${name.replace(" ", "-")}-${key.replace(" ", "-")}`;
                    if (value.parent.match("Design System/light")) {
                        const color = getSMTDesignDesignSystem(value);
                        styles += `${cssVariableName}: ${color};`;
                    } else {
                        styles += `${cssVariableName}: ${value.value};`;
                    }
                } else if (value.type === 'dimension') {
                    cssVariableName = `--${name.replace(" ", "-")}${key.replace(" ", "-")}`;
                    styles += `${cssVariableName}: ${value.value};`;
                }
            });
        });
    });
    return styles + ' }';
}

export { setCSSVariables };