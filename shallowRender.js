import ReactShallowRenderer from './ReactShallowRenderer';

const shallowRender = Component => new ReactShallowRenderer(Component).getRenderOutput();

export default shallowRender;