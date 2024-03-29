import Spinner from '@/public/svgs/icon _spinner.svg';
import Text from '@/src/components/common/Text';
import { IUser } from '../../../../../lib/types';
import ProfileImage from './components/ProfileImage';

export interface WelcomeTitleProps {
  user: IUser;
}

const WelcomeTitle = ({ user }: WelcomeTitleProps) => {
  if (user?.firstName === undefined)
    return (
      <section className="w-[25rem] h-[8rem] bg-secondary flex items-center rounded-[0.75rem] sm:w-full md:w-full justify-evenly">
        <Spinner className="mx-auto animate-spin-slow" />
      </section>
    );

  return (
    <section className="w-[25rem] h-[8rem] bg-secondary flex items-center rounded-[0.75rem] sm:w-full md:w-full justify-evenly">
      <ProfileImage profileImage={user?.profileImage} />
      <Text text_tag="p" color="default" size="3xl" bold>
        {user?.lastName.toUpperCase() + ' ' + user?.firstName.toUpperCase()}
      </Text>
    </section>
  );
};

export default WelcomeTitle;
