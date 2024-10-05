// props example

{
  // the props object type
  type MyProps = {
    name: string;
    city?: string;
    age: number;
    num?: number;
  };

  // a props object
  const props: MyProps = { name: "Harry", age: 21 };

  // destructure props
  const { name, city = "Waterloo", age, num = 0 } = props;

  console.log(name, city, age, num);

  // use props as function argument
  function func({ name, city = "Waterloo", age, num = 0 }: MyProps) {
    console.log(name, city, age, num);
  }

  func({ name: "Harry", age: 21 });

  func({ name: "Luna", city: "Fredericton", age: 22, num: 2 });

  func({ name: "Draco", city: "Toronto", age: 20 });
}
