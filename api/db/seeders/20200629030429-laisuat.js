'use strict';

const now = new Date();
const bangLaiSuat = [
  {
    id: '1t_d300tr',
    donvitiente: 'VND',
    kyhan: '1 tuần',
    muctien: 'dưới 300 triệu',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '1t_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '1 tuần',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '1t_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '1 tuần',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '1t_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '1 tuần',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '1t_t10t',
    donvitiente: 'VND',
    kyhan: '1 tuần',
    muctien: 'trên 10 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '2t_d300tr',
    donvitiente: 'VND',
    kyhan: '2 tuần',
    muctien: 'dưới 300 triệu',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2t_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '2 tuần',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2t_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '2 tuần',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2t_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '2 tuần',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2t_t10t',
    donvitiente: 'VND',
    kyhan: '2 tuần',
    muctien: 'trên 10 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '3t_d300tr',
    donvitiente: 'VND',
    kyhan: '3 tuần',
    muctien: 'dưới 300 triệu',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3t_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '3 tuần',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3t_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '3 tuần',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3t_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '3 tuần',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3t_t10t',
    donvitiente: 'VND',
    kyhan: '3 tuần',
    muctien: 'trên 10 tỷ',
    laisuat: '0.8',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '1th_d300tr',
    donvitiente: 'VND',
    kyhan: '1 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '4.6',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '1th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '1 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '4.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '1th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '1 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '4.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '1th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '1 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '4.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '1th_t10t',
    donvitiente: 'VND',
    kyhan: '1 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '4.9',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '2th_d300tr',
    donvitiente: 'VND',
    kyhan: '2 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '4.6',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '2 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '4.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '2 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '4.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '2 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '4.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2th_t10t',
    donvitiente: 'VND',
    kyhan: '2 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '4.9',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '3th_d300tr',
    donvitiente: 'VND',
    kyhan: '3 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '4.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '3 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '4.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '3 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '4.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '3 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '5.0',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3th_t10t',
    donvitiente: 'VND',
    kyhan: '3 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '5.0',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '4th_d300tr',
    donvitiente: 'VND',
    kyhan: '4 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '4.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '4th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '4 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '4.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '4th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '4 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '4.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '4th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '4 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '5.0',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '4th_t10t',
    donvitiente: 'VND',
    kyhan: '4 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '5.0',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '5th_d300tr',
    donvitiente: 'VND',
    kyhan: '5 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '4.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '5th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '5 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '4.8',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '5th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '5 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '4.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '5th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '5 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '5.0',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '5th_t10t',
    donvitiente: 'VND',
    kyhan: '5 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '5.0',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '6th_d300tr',
    donvitiente: 'VND',
    kyhan: '6 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '7.1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '6th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '6 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '6th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '6 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '6th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '6 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.5',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '6th_t10t',
    donvitiente: 'VND',
    kyhan: '6 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.5',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '7th_d300tr',
    donvitiente: 'VND',
    kyhan: '7 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '7th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '7 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '7th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '7 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '7th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '7 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '7th_t10t',
    donvitiente: 'VND',
    kyhan: '7 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '8th_d300tr',
    donvitiente: 'VND',
    kyhan: '8 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '8th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '8 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '8th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '8 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '8th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '8 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '8th_t10t',
    donvitiente: 'VND',
    kyhan: '8 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '9th_d300tr',
    donvitiente: 'VND',
    kyhan: '9 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '9th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '9 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '9th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '9 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.0',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '9th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '9 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '9th_t10t',
    donvitiente: 'VND',
    kyhan: '9 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '10th_d300tr',
    donvitiente: 'VND',
    kyhan: '10 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '10th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '10 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '10th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '10 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.0',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '10th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '10 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '10th_t10t',
    donvitiente: 'VND',
    kyhan: '10 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '11th_d300tr',
    donvitiente: 'VND',
    kyhan: '11 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '11th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '11 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '6.9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '11th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '11 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.0',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '11th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '11 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '11th_t10t',
    donvitiente: 'VND',
    kyhan: '11 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '12th_d300tr',
    donvitiente: 'VND',
    kyhan: '12 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '7.05',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '12th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '12 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '7.15',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '12th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '12 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.15',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '12th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '12 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.25',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '12th_t10t',
    donvitiente: 'VND',
    kyhan: '12 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.25',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '13th_d300tr',
    donvitiente: 'VND',
    kyhan: '13 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '7.05',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '13th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '13 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '7.15',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '13th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '13 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.15',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '13th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '13 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.25',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '13th_t10t',
    donvitiente: 'VND',
    kyhan: '13 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.25',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '15th_d300tr',
    donvitiente: 'VND',
    kyhan: '15 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '7.0',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '15th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '15 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '7.1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '15th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '15 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '15th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '15 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '15th_t10t',
    donvitiente: 'VND',
    kyhan: '15 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '18th_d300tr',
    donvitiente: 'VND',
    kyhan: '18 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '18th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '18 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '18th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '18 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '18th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '18 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '18th_t10t',
    donvitiente: 'VND',
    kyhan: '18 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.7',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '24th_d300tr',
    donvitiente: 'VND',
    kyhan: '24 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '24th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '24 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '24th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '24 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '24th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '24 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '24th_t10t',
    donvitiente: 'VND',
    kyhan: '24 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.7',
    createdAt: now,
    updatedAt: now,
  },

  {
    id: '36th_d300tr',
    donvitiente: 'VND',
    kyhan: '36 tháng',
    muctien: 'dưới 300 triệu',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '36th_t300tr_d1t',
    donvitiente: 'VND',
    kyhan: '36 tháng',
    muctien: '300 triệu -  1 tỷ',
    laisuat: '7.3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '36th_t1t_d5t',
    donvitiente: 'VND',
    kyhan: '36 tháng',
    muctien: '1 tỷ - 5 tỷ',
    laisuat: '7.4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '36th_t5t_d10t',
    donvitiente: 'VND',
    kyhan: '36 tháng',
    muctien: '5 tỷ- 10 tỷ',
    laisuat: '7.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '36th_t10t',
    donvitiente: 'VND',
    kyhan: '36 tháng',
    muctien: 'trên 10 tỷ',
    laisuat: '7.7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'khongkyhan',
    donvitiente: 'VND',
    kyhan: 'Không kỳ hạn',
    muctien: 'Bất kỳ',
    laisuat: '0.5',
    createdAt: now,
    updatedAt: now,
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('laisuats', bangLaiSuat);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
