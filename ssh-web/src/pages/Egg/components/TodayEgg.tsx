import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Badge } from '../../../components/atoms/Badge';
import { CircularImage } from '../../../components/atoms/CircularImage';
import { Typography } from '../../../components/atoms/Typography';
import {
  getCurrentEggStatus,
  getMyAccountList,
  updateCurrentEggStatus,
} from '../../../apis/eggApi';
import { isModalOpenState } from '../../../atoms/modal';
import { Button } from '../../../components/atoms/Button';
import { ConfettiLottie } from './Lottie/ConfettiLottie';
import { showToast } from '../../../utils/toastUtil';

export const TodayEgg = () => {
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [touchesLeft, setTouchesLeft] = useState(100);
  const [eggBgColor, setEggBgColor] = useState('bg-primary-400');
  const [eggScale, setEggScale] = useState('scale-100');
  const [todayDestroyCount, setTodayDestroyCount] = useState(0);
  const [modalState, setModalState] = useRecoilState(isModalOpenState);
  const [hasSaveAccount, setHasSaveAccount] = useState<boolean>(false);

  const fetchEggStatus = async () => {
    try {
      const response = await getCurrentEggStatus();
      const { needHitCount, todayDestroyCount } = response.data;
      setTouchesLeft(needHitCount);
      setTodayDestroyCount(todayDestroyCount);
      setCollectedAmount(100 - needHitCount); // 초기 수집 금액 설정
    } catch (error) {
      console.error('계란 상태 가져오기 실패', error);
    }
  };

  const checkMySaveAccount = async () => {
    try {
      const response = await getMyAccountList();

      response.data?.map((account) => {
        if (account.accountType === '2') setHasSaveAccount(true); //저축계좌
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEggStatus();
    checkMySaveAccount();
  }, []);

  const generateTouchEffect = (event: React.MouseEvent<HTMLDivElement>) => {
    const touchEffect = document.createElement('div');
    const size = Math.random() * 40 + 20; // 크기 줄임
    const colors = ['#FF6347', '#FFD700', '#4CAF50', '#00BFFF', '#FF69B4'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    touchEffect.style.width = `${size}px`;
    touchEffect.style.height = `${size}px`;
    touchEffect.style.backgroundColor = color;
    touchEffect.style.position = 'absolute';
    touchEffect.style.borderRadius = '50%';
    touchEffect.style.left = `${event.clientX - size / 2}px`;
    touchEffect.style.top = `${event.clientY - size / 2}px`;
    touchEffect.style.pointerEvents = 'none';
    touchEffect.style.opacity = '0.7';
    touchEffect.style.transform = 'scale(0.5)';
    touchEffect.style.animation = 'touchEffectAnimation 0.4s ease-out forwards';

    document.body.appendChild(touchEffect);

    setTimeout(() => {
      touchEffect.remove();
    }, 400);
  };

  const handleEggClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    generateTouchEffect(event);

    if (touchesLeft <= 0) {
      return;
    }

    if (touchesLeft > 0) {
      try {
        setEggBgColor('bg-primary-300');
        setEggScale('scale-110');

        setTimeout(() => {
          setEggBgColor('bg-primary-400');
          setEggScale('scale-100');
        }, 100);

        const response = await updateCurrentEggStatus(1);
        const reward = response.data;

        setCollectedAmount((prev) => prev + 1);
        setTouchesLeft((prev) => prev - 1);

        const savingsMessage = (
          <div className="flex flex-col w-full p-4 bg-primary-100 rounded-3xl text-center items-center justify-center">
            <Typography
              weight="semibold"
              size="lg"
              classNameStyles="my-4"
              color="dark"
            >
              계란을 깨서 내 계좌에 100원을 저축했어요!
            </Typography>
          </div>
        );

        if (reward && reward?.isFail === false) {
          console.log('보상 도착:', reward);
          setModalState({
            isOpen: true,
            content: (
              <div className="flex flex-col items-center justify-center gap-4">
                <Typography weight="bold" size="6xl" color="primary">
                  축하합니다!
                </Typography>
                <Typography
                  weight="semibold"
                  size="3xl"
                  classNameStyles="!text-primary-300 mb-3"
                >
                  {reward?.specialEggName}이 나왔어요
                </Typography>
                <div className="relative w-full h-max bg-primary-300 flex flex-row justify-center items-center py-8 rounded-3xl">
                  <img src={reward?.imageUrl} alt="" className="w-[12rem]" />
                  <div className="absolute left-1/4 bottom-20 w-full flex flex-col items-center justify-center">
                    <img
                      src={'/assets/images/check_icon.png'}
                      alt=""
                      className="absolute w-[9rem]"
                    />
                  </div>
                </div>

                {savingsMessage}
                <Button
                  fullWidth
                  classNameStyles="!h-24 !text-2xl !font-bold py-6 mt-8 rounded-2xl"
                  onClick={() => {
                    setModalState({ isOpen: false, content: null });
                  }}
                >
                  계란 마저 깨러가기
                </Button>
              </div>
            ),
          });
        }

        if (reward && reward?.isFail === true) {
          console.log('보상 도착:', reward);
          setModalState({
            isOpen: true,
            content: (
              <div className="flex flex-col items-center justify-center gap-4">
                <Typography weight="bold" size="6xl" color="primary">
                  아쉬워요!
                </Typography>
                <Typography
                  weight="semibold"
                  size="2xl"
                  classNameStyles="!text-primary-300 mb-3"
                >
                  아무것도 나오지 않았어요.
                </Typography>
                <div className="relative w-full h-max bg-secondary-400 flex flex-row justify-center items-center py-8 rounded-3xl">
                  <img
                    src={'/assets/images/egg_crack.png'}
                    alt=""
                    className="w-[14rem]"
                  />
                </div>
                {savingsMessage}
                <Button
                  fullWidth
                  classNameStyles="!h-24 !text-2xl !font-bold py-6 mt-8 rounded-2xl"
                  onClick={() => {
                    setModalState({ isOpen: false, content: null });
                  }}
                >
                  계란 마저 깨러가기
                </Button>
              </div>
            ),
          });
        }
        if (touchesLeft === 1) {
          fetchEggStatus();
        }
      } catch (error) {
        console.error('계란 상태 업데이트 실패', error);
      }
    }
  };

  return (
    <div className="TAB-CONTENT">
      <div className="text-right">
        <Typography
          weight="bold"
          size="7xl"
          classNameStyles="!text-primary-400 animate-popIn"
        >
          + {collectedAmount}원
        </Typography>
      </div>
      <div className="flex flex-row justify-between w-full items-end mb-5">
        <Badge
          text={`${todayDestroyCount} / 10`}
          weight="semibold"
          startIcon={
            <CircularImage
              imgWidth="70%"
              imageUrl="/assets/images/samples/eggs/egg_basic.png"
              altText="eggBadge"
              bgColor="blue"
              size="xs"
            />
          }
        />
        <Typography weight="semibold" classNameStyles="!text-primary-300">
          계란을 눌러서 저금한 돈이에요.
        </Typography>
      </div>

      {hasSaveAccount ? (
        <div>
          <div
            onClick={handleEggClick}
            className={`TOUCHABLE-EGG relative ${eggBgColor} flex items-center justify-center overflow-hidden transition-all duration-300 w-full h-[18rem] rounded-t-3xl mb-10 cursor-pointer`}
          >
            <img
              src={'/assets/images/samples/eggs/egg_basic.png'}
              alt={'touchableEgg'}
              style={{ width: '50%', objectFit: 'cover' }}
              className={`rounded-full absolute top-10 transform transition-transform duration-300 ${eggScale}`}
            />
          </div>
          <div className="bg-primary-200 w-full h-24 rounded-3xl items-center flex flex-row justify-center gap-4">
            <Typography
              size="6xl"
              weight="bold"
              classNameStyles="!text-primary-400"
            >
              {touchesLeft}번
            </Typography>
            <Typography size="6xl" weight="bold" color="light">
              더 터치!
            </Typography>
          </div>
        </div>
      ) : (
        <div>
          <div
            onClick={() => {
              showToast('success', '부모님께 저축계좌를 만들어달라고 해봐요');
              setEggScale('scale-110');

              setTimeout(() => {
                setEggScale('scale-100');
              }, 100);
            }}
            className={`UNTOUCHABLE-EGG relative bg-secondary-500 flex items-center justify-center overflow-hidden transition-all duration-300 w-full h-[18rem] rounded-t-3xl mb-10 cursor-pointer`}
          >
            <img
              src={'/assets/images/egg_question.png'}
              alt={'untouchableEgg'}
              style={{ width: '50%', objectFit: 'cover' }}
              className={`rounded-full absolute top-10 transform transition-transform duration-300 ${eggScale}`}
            />
          </div>
          <div className="bg-secondary-700 w-full h-24 rounded-3xl items-center flex flex-row justify-center gap-4">
            <Typography size="4xl" weight="bold" color="light">
              내 저축 계좌가 없어요
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = document.createElement('style');
styles.innerHTML = `
@keyframes touchEffectAnimation {
  from {
    transform: scale(0.5);
    opacity: 0.5;
  }
  to {
    transform: scale(1.5);
    opacity: 0;
  }
}`;
document.head.appendChild(styles);
