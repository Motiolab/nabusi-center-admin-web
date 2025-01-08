import { Checkbox } from 'antd';
import styled from 'styled-components';

const CustomCheckbox = styled(Checkbox)`
    &.ant-checkbox-wrapper-disabled {
        .ant-checkbox-inner {
            &:after {
                border-color: var(--Neutrals-Neutrals200);
            }
        }
    }
`;

export default CustomCheckbox;