import React from "react";
import { Typography } from "../../atoms/Typography";
import { QuizDetailProps } from "./QuizDetail.types";
import { quizContent, keyword as keywordstyle } from "./QuizDetail.styles";


export const QuizDetail = ({ size, description, error, loading, keyword, children }: QuizDetailProps) => {
  return (
    <div className={quizContent({size})}>
      <Typography color='primary' weight='medium' classNameStyles="text-center">
        {loading ? "퀴즈 정보를 불러오는 중입니다..." : description || ""}
      </Typography>
      <div className={keywordstyle({ size })}>
            <Typography color='secondary' weight='bold'>키워드</Typography>
            <Typography color='secondary' weight='medium'>|</Typography>
            <Typography color='primary' weight='semibold'>{keyword ? keyword : ""}</Typography>
      </div>
      {children}
    </div>
  );
}