import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import Question from 'src/components/session/Question'

const mockQuestion = {
    title: 'Question title',
    body: 'Question body',
    hints: [
        'hint number 1',
        'hint number 2',
        'hint number 3',
    ], 
}

it("renders without crashing", () => {
    shallow(<Question question={mockQuestion} />);
});

it('renders correctly', () => {
    const component = renderer.create(
        <Question question={mockQuestion} />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
