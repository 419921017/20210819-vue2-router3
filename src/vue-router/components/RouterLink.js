const RouterLink = {
  // 函数式组件, 无状态, 没有data
  functional: true,
  props: {
    to: {
      type: [String],
      required: true,
    },
  },
  render(h, { props, slots, parent }) {
    const click = () => {
      // console.log(props.to);
      parent.$router.push(props.to);
    };
    return <a onClick={click}>{slots().default}</a>;
  },
};
export default RouterLink;
