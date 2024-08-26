import React, { ReactNode, useCallback } from 'react';
import TextField from '../../atoms/TextField';
import { FormTitle } from '../../molecules/FormTitle';
import { containerStyles, contentStyles } from './UserInfoForm.styles';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { UserInfoFormProps } from './UserInfoForm.types';
import { IContent } from '../../../interfaces/userInterface';
import { useRecoilState } from 'recoil';
import { signupAtom } from '../../../atoms/signup';

export const UserInfoForm = ({
  contents,
  onContentHandler,
  handler,
  children,
  classNameStyles,
}: UserInfoFormProps) => {
  const [step, setStep] = useRecoilState(signupAtom);
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
          return content.contentType === 'textfield' ||
            content.contentType === 'numberdial' ? (
            <TextField
              key={idx}
              label={content.keyword}
              variant="standard"
              defaultValue={content.value as string}
              fullWidth
              classNameStyles={contentStyles({
                contentType: 'textfield',
                step: step >= idx,
              })}
              onPageHandler={() => content.dialPage?.('birthday')}
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
