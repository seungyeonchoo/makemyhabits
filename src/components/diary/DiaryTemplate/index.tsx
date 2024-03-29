import useInput from '@/src/lib/hooks/useInput';
import useToggle from '@/src/lib/hooks/useToggle';
import ApiService from '@/src/lib/service';
import { IDiary } from '@/src/lib/types';
import { ChangeEvent, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import DiaryCalendar from '../DiaryCalendar';
import DiaryNote from '../DiaryNote';

interface DiaryTemplateProps {
  currDate: string;
  // eslint-disable-next-line no-unused-vars
  handleCurrentDate: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  diaries: IDiary[];
  userID: number;
}

const DiaryTemplate = ({ currDate, handleCurrentDate, diaries, userID }: DiaryTemplateProps) => {
  const API = new ApiService();
  const isRendered = typeof window !== 'undefined';
  const id = isRendered ? JSON.parse(localStorage.getItem('user') as string).id : null;
  const { toggle: editToggle, handleToggle: handleEditToggle, setToggle } = useToggle();

  const queryClient = useQueryClient();

  const initialDiaryInput = {
    id: null,
    userId: id,
    date: currDate,
    content: '',
    color: 'bg-gray-100',
  };

  const { input, handleInput, setInput } = useInput(initialDiaryInput);

  const { mutate: handlePost } = useMutation(() => API.post('diaries', input), {
    onSuccess: () => {
      handleEditToggle();
      queryClient.invalidateQueries();
    },
  });

  const { mutate: handleDelete } = useMutation(() => API.delete(`diaries/${input?.id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      setInput(initialDiaryInput);
    },
  });

  const { mutate: handlePatch } = useMutation(() => API.patch(`diaries/${input?.id}`, input), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleInit = () => {
    setInput(initialDiaryInput);
  };

  useEffect(() => {
    API.get('diaries', { userId: userID, date: currDate })
      .then(diary => {
        if (diary[0]) setInput(diary[0]);
        else setInput(initialDiaryInput);
      })
      .catch(err => console.log(err));
  }, [currDate]);

  useEffect(() => {
    setToggle(false);
  }, [currDate]);

  return (
    <section className="relative flex justify-center sm:flex-col md:flex-col sm:w-full md:w-full sm:items-center md:items-center lg:px-[10%] sm:py-[1rem] py-[5%]">
      <DiaryCalendar
        handleCurrCalendar={handleCurrentDate}
        diaries={diaries}
        currDate={input.date}
      />
      <DiaryNote
        diary={input}
        handleDiary={handleInput}
        handlePost={handlePost}
        handlePatch={handlePatch}
        handleDelete={editToggle ? () => setInput(initialDiaryInput) : handleDelete}
        currDate={currDate}
        editToggle={editToggle}
        handleEditToggle={handleEditToggle}
        handleInit={handleInit}
      />
    </section>
  );
};

export default DiaryTemplate;
