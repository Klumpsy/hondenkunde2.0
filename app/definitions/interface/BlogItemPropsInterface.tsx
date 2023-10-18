export interface BlogItemInterface {
  id: string;
  slug: string;
  created: string;
  tags?: string[];
  title: string;
  introText: string;
  textBlockOne?: string;
  textBlockTwo?: string;
  textBlockThree?: string;
  introImage: any;
}

export interface BlogItemProps {
  blogItem: BlogItemInterface;
  className: string;
}
