import { splitStringOnDoc } from "@/shared";
import token from "@/nabusi-design-token/e.g.token.json"

const getSMTDesignColor = (color: string, brightness?: '' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | ' White' | ' Black'): ISMTValue => {
    try {
        const nabusiToken: ISMTToken | undefined = token ? token : undefined;
        if (!nabusiToken) return { parent: 'none', description: 'none', type: 'none', value: 'none' };
        if (!brightness) brightness = '';
        const colorValue = nabusiToken['Color/Value'];
        const designSystem = nabusiToken['Design System/light'];
        const designValue = designSystem[color][color + brightness] ? splitStringOnDoc(designSystem[color][color + brightness].value) : '';
        return designValue ? colorValue[designValue[0]][designValue[1]] : { parent: 'none', description: 'none', type: 'none', value: 'none' };
    } catch (error) {
        console.error("error: ", error)
        return { parent: 'none', description: 'none', type: 'none', value: 'none' };
    }
}


const getSMTDesignDesignSystem = (color: ISMTValue): string => {
    try {
        const nabusiToken: ISMTToken | undefined = token ? token : undefined;
        if (!nabusiToken) return 'none';
        const colorValue = nabusiToken['Color/Value'];
        if (color.value.startsWith("#")) {
            return color.value;
        }
        const design = splitStringOnDoc(color.value)
        return colorValue[design[0]][design[1]].value;
    } catch (error) {
        console.error("error: ", error)
        return 'error';
    }
}

export { getSMTDesignColor, getSMTDesignDesignSystem }