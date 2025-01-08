import { mainCategorySegment } from '@/entities';
import { pathToKr } from '@/shared';
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

interface IProps {
    importContent?: string;
    addSegments?: string[];
    customSegments?: { segments: string[], href: string[] };
}
const BreadCrumb = ({ importContent, addSegments = [], customSegments }: IProps) => {
    const location = useLocation();
    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter((segment) => segment);
    const confirmedSegment = customSegments ? customSegments.segments : [...pathSegments, ...addSegments]

    return <>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {importContent ? <div style={{ color: "var(--Base-Base-Black)", fontSize: "14px" }}>{importContent}</div> : confirmedSegment.map((segment, idx, arr) => {
                if (segment === "home") return;
                const href = '/' + pathSegments.slice(0, idx + 1).join('/');
                if (arr.length !== idx + 1) {
                    return <Fragment key={idx}>
                        <Link key={idx} style={{ color: "var(--Neutrals-Neutrals500)", textDecoration: "none", fontSize: "14px", cursor: mainCategorySegment().includes(segment) ? "default" : "pointer" }} to={customSegments ? customSegments.href[idx] : mainCategorySegment().includes(segment) ? "#" : href}>{pathToKr(segment)}</Link>
                        <div style={{ color: "var(--Neutrals-Neutrals500)" }}>/</div>
                    </Fragment>
                } else {
                    return <div key={idx} style={{ color: "var(--Base-Base-Black)", fontSize: "14px" }}>{pathToKr(segment)}</div>
                }

            })}
        </div>
    </>
};

export { BreadCrumb };
