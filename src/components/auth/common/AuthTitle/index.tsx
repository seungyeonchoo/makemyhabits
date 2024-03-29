import Text from '../../../../../src/components/common/Text';

export interface AuthTitleProps {
  title_text: string;
  description: string;
  title_color: 'primary' | 'default' | 'secondary' | 'dark';
  text_color: 'primary' | 'default' | 'secondary' | 'dark';
}

const AuthTitle = ({ title_text, title_color, text_color, description }: AuthTitleProps) => {
  return (
    <section
      className={`mb-10 w-[20rem] mx-auto max-sm:w-full flex flex-col items-center justify-between`}
    >
      <Text text_tag="h1" size="3xl" color={title_color} bold>
        {title_text}
      </Text>
      <Text text_tag="p" size="xs" color={text_color} extra_style="mt-8">
        {description}
      </Text>
    </section>
  );
};

export default AuthTitle;
