import { expect } from 'chai';
import { getAllUser } from '../../utils/user_utils.js';

describe('getAllUser', () => {
  it('should return array', async () => {
    const test = await getAllUser();
    expect(test).to.be.an('array');
  });
});

/*describe('getAllDepartment', () => {
  it('should return array wirh a property: department_id', async () => {
    const test = await getAllUser();
    const objectWithDepartmentId = test.find(obj => obj.hasOwnProperty('department_id'));
    expect(objectWithDepartmentId).to.have.property('department_id');
  });
});*/