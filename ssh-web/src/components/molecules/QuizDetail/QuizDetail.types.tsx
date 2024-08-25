import { ReactNode } from "react";
import { EResize } from "../../../themes/themeBase";

export interface QuizDetailProps {
    description: string;
    keyword: string;
    quizId: number;
    loading: boolean;
    error: string | null;
    size: EResize;
    children: ReactNode;
}