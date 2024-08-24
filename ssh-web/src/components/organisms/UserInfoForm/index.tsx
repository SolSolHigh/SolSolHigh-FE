import React, { ReactNode, useCallback, useState } from 'react';
import TextField from '../../atoms/TextField';
import { FormTitle } from '../../molecules/FormTitle';
import { containerStyles, contentStyles } from './UserInfoForm.styles';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { UserInfoFormProps } from './UserInfoForm.types';
import { IContent } from '../../../interfaces/userInterface';

export const UserInfoForm = ({
  contents,
  onContentHandler,
  handler,
  children,
  classNameStyles,
}: UserInfoFormProps) => {
  const [step, setStep] = useState<number>(0);
  const onChangeStep = useCallback(
    (nextStep: number) => {
      setStep(() => nextStep);
    },
    [step],
  );

  return (
    <div className={`${containerStyles()} ${classNameStyles}`}>
      <div className="w-full">
        <FormTitle
          keyword={contents[step].keyword}
          ment={contents[step].ment}
          steps={contents.length}
          curStep={step}
          onChangeStep={onChangeStep}
        />
        {contents.map((content: IContent, idx: number) => {
          return content.contentType === 'textfield' ? (
            <TextField
              key={idx}
              label={content.keyword}
              variant="standard"
              fullWidth
              classNameStyles={contentStyles({
                contentType: 'textfield',
                step: step >= idx,
              })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onContentHandler(idx, e.target.value)
              }
            />
          ) : (
            <div
              key={idx}
              className={contentStyles({
                contentType: 'buttons',
                step: step >= idx,
              })}
            >
              {content.valueList?.map((value: ReactNode, index: number) => {
                return (
                  <Button
                    key={index}
                    color={value === content.value ? 'primary' : 'secondary'}
                    size="sm"
                    classNameStyles="min-w-[7rem]"
                    onClick={() => onContentHandler(idx, value)}
                  >
                    <Typography weight="semibold" color="light" size="sm">
                      {value}
                    </Typography>
                  </Button>
                );
              })}
            </div>
          );
        })}
      </div>
      {step >= contents.length - 1 && (
        <Button fullWidth onClick={handler.handler}>
          <Typography weight="semibold" color="light" size="sm">
            {handler.label}
          </Typography>
        </Button>
      )}
      {children}
    </div>
  );
};
