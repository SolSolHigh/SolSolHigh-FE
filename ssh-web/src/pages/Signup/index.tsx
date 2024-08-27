import React, { ReactNode, useCallback, useState } from 'react';
import { Mascot } from '../../components/molecules/Mascot';
import { contentStyles } from './style';
import { UserInfoForm } from '../../components/organisms/UserInfoForm';
import {
  IContent,
  IContentHandler,
  ISignupRequest,
} from '../../interfaces/userInterface';
import dayjs from 'dayjs';
import { BirthdayForm } from '../../components/organisms/BirthdayForm';
import { nicknameDuplicate, signup } from '../../apis/userApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export const Signup = () => {
  const location = useLocation();
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (request: ISignupRequest) => await signup(request),
    onSuccess: () => nav('/'),
    onError: (err) => console.log(err),
  });
  const [pageType, setPageType] = useState<string>('info');
  const [contents, setContents] = useState<IContent[]>([
    {
      key: 'nickname',
      keyword: '닉네임',
      ment: '이 뭐에요?',
      contentType: 'textfield',
      value: '',
    },
    {
      key: 'birthday',
      keyword: '생일',
      ment: '은 언제에요?',
      contentType: 'numberdial',
      value: dayjs(new Date()).format('YYYY-MM-DD'),
      dialPage: (page: string) => setPageType(page),
    },
    {
      key: 'gender',
      keyword: '성별',
      ment: '은 뭐에요?',
      contentType: 'buttons',
      value: '남',
      valueList: ['남', '여'],
    },
    {
      key: 'type',
      keyword: '역할',
      ment: '이 뭐에요?',
      contentType: 'buttons',
      value: '부모',
      valueList: ['부모', '자녀'],
    },
  ]);
  const onContentHandler = useCallback(
    (idx: number, value: ReactNode) => {
      setContents((prev) => {
        const newContents = [...prev];
        newContents[idx].value = value;
        return newContents;
      });
    },
    [contents],
  );
  const [handler, setHandler] = useState<IContentHandler>({
    label: '회원가입',
    handler: async () => {
      const nicknameCheck = /^(?![ㄱ-ㅎㅏ-ㅣ]+$)[가-힣A-Za-z]{2,8}$/;
      if (
        !(contents[0].value as string).length ||
        !nicknameCheck.test(contents[0].value as string)
      ) {
        alert('닉네임은 한글/영문 2~8자 입니다');
      } else {
        await nicknameDuplicate(contents[0].value as string).then((res) => {
          if (res.data.isDuplicated) {
            mutate({
              code: location.state?.code,
              nickname: contents[0].value as string,
              birthday: contents[1].value as string,
              gender: contents[2].value === '남' ? 'M' : 'F',
              type: contents[3].value === '부모' ? 'PARENT' : 'CHILD',
            });
          } else {
            alert('중복된 닉네임입니다');
          }
        });
      }
    },
  });
  const birthdayHandler = (year: number, month: number, day: number) => {
    setContents((prev) => {
      const newContents = [...prev];
      newContents[1].value = dayjs(`${year}-${month}-${day}`).format(
        'YYYY-MM-DD',
      );
      return newContents;
    });
    setPageType('info');
  };

  return (
    <div className="flex items-center justify-center w-full h-auto tablet:flex-col">
      <Mascot nickname="닉네임" ment="반가워요! 몇 가지만 더 물어볼게요" />
      <div className={contentStyles()}>
        {pageType === 'info' ? (
          <UserInfoForm
            contents={contents}
            onContentHandler={onContentHandler}
            handler={handler}
          />
        ) : (
          <BirthdayForm
            defaultYear={dayjs(contents[1].value as string).year()}
            defaultMonth={dayjs(contents[1].value as string).month()}
            defaultDay={dayjs(contents[1].value as string).date()}
            handler={birthdayHandler}
          />
        )}
      </div>
    </div>
  );
};
