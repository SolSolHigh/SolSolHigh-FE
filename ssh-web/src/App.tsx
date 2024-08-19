import './App.css';
import { Button } from './components/atoms/Button';
import { Skeleton } from './components/atoms/Skeleton';
import { ExampleResponse } from './interfaces/Example';
import { useQuery } from '@tanstack/react-query';
import { getExamples } from './apis/Example';

function App() {
  const {
    data: examplesData,
    isLoading: isExamplesLoading,
    error: examplesError,
  } = useQuery<ExampleResponse>({
    queryKey: ['examples'],
    queryFn: getExamples,
    staleTime: 1000 * 60,
  });

  if (examplesError) {
    console.error('Error fetching examples:', examplesError);
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row gap-4">
        <div>폰트 테스트</div>
        <div className="font-thin">tailwind</div>
      </div>

      {/* Button 사용 예시 */}
      <div className="flex flex-col gap-3 mt-4 w-36 border-2 border-gray-400">
        <Button>버튼1</Button>
        <Button color="gray">버튼2</Button>
        <Button outlined>버튼3</Button>
        <Button rounded>버튼4</Button>
        <Button rounded outlined>
          버튼5
        </Button>
        <Button fullWidth>fullWidth</Button>
      </div>

      {/* Example 리스트 로딩 및 데이터 표시 */}
      <div className="flex flex-col gap-3 mt-4 w-80 border-2 border-gray-400 p-4">
        <h3 className="text-sm">스켈레톤 사용 예시</h3>
        {isExamplesLoading ? (
          // 로딩 중일 때 Skeleton 컴포넌트 표시
          <>
            <Skeleton variant="rectangular" width="100%" height="40px" />
            <Skeleton variant="rectangular" width="100%" height="40px" />
            <Skeleton variant="rectangular" width="100%" height="40px" />
          </>
        ) : (
          // 로딩이 완료되면 Example 데이터를 표시
          examplesData?.examples.map((example) => (
            <div key={example.id} className="flex justify-between">
              <span>{example.name}</span>
              <span>${example.number}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
