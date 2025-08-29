import builderReducer, {
  initialState,
  setType,
  setCampaignName,
  setBrandColor,
  setStampsNeeded,
  clearBuilderData,
  publishPass,
  archivePass,
} from '../builderSlice';

describe('builderSlice', () => {
  it('should return initial state', () => {
    expect(builderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setType', () => {
    const newState = builderReducer(initialState, setType('discount'));
    expect(newState.type).toBe('discount');
    expect(newState.updatedAt).not.toEqual(initialState.updatedAt);
  });

  it('should handle setCampaignName', () => {
    const newState = builderReducer(initialState, setCampaignName('Test Campaign'));
    expect(newState.campaignName).toBe('Test Campaign');
    expect(newState.updatedAt).not.toEqual(initialState.updatedAt);
  });

  it('should handle setBrandColor', () => {
    const newState = builderReducer(initialState, setBrandColor('#FF0000'));
    expect(newState.brandColor).toBe('#FF0000');
    expect(newState.updatedAt).not.toEqual(initialState.updatedAt);
  });

  it('should handle clearBuilderData', () => {
    const stateWithData = {
      ...initialState,
      campaignName: 'Test Campaign',
      type: 'discount' as const,
    };
    
    const newState = builderReducer(stateWithData, clearBuilderData());
    expect(newState.campaignName).toBe('');
    expect(newState.type).toBe('loyalty');
    expect(newState.updatedAt).not.toEqual(stateWithData.updatedAt);
  });

  it('should handle publishPass', () => {
    const newState = builderReducer(initialState, publishPass());
    expect(newState.status).toBe('published');
    expect(newState.updatedAt).not.toEqual(initialState.updatedAt);
  });

  it('should handle archivePass', () => {
    const newState = builderReducer(initialState, archivePass());
    expect(newState.status).toBe('archived');
    expect(newState.updatedAt).not.toEqual(initialState.updatedAt);
  });

  it('should validate campaign name length', () => {
    const longName = 'a'.repeat(101);
    expect(() => {
      builderReducer(initialState, setCampaignName(longName));
    }).toThrow('Campaign name must be less than 100 characters');
  });

  it('should validate brand color format', () => {
    expect(() => {
      builderReducer(initialState, setBrandColor('invalid-color'));
    }).toThrow('Invalid hex color format');
  });

  it('should validate stamps needed range', () => {
    expect(() => {
      builderReducer(initialState, setStampsNeeded(0));
    }).toThrow('Stamps needed must be between 1 and 20');
    
    expect(() => {
      builderReducer(initialState, setStampsNeeded(21));
    }).toThrow('Stamps needed must be between 1 and 20');
  });
});
