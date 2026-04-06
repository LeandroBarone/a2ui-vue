import type { Types } from '../types';
type __VLS_Props = {
    surfaceId: string;
    component: Types.AnyComponentNode;
    weight?: string | number;
    label?: Types.StringValue | null;
    options: {
        label: Types.StringValue;
        value: string;
    }[];
    selections: Types.AnyComponentNode | null;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
