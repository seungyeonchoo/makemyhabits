import Text from '@/src/components/common/Text';
import { IUser } from '../../../../../../src/lib/types';
import Navigation from './components/Navigation';
import ProfileImage from './components/ProfileImage';

export interface WelcomeTitleProps {
  user: IUser;
}

const WelcomeTitle = ({ user }: WelcomeTitleProps) => {
  return (
    <section className="w-[25rem] h-[8rem] bg-secondary flex items-center rounded-[0.75rem] sm:w-full md:w-full justify-evenly">
      <ProfileImage />
      <Text text_tag="p" color="default" size="3xl" bold>
        {user?.lastName.toUpperCase() + ' ' + user?.firstName.toUpperCase()}
      </Text>
      <Navigation />
    </section>
  );
};

export default WelcomeTitle;
