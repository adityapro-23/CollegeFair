import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================================
// COLLEGE DATA — 210+ Indian Engineering Colleges
// ============================================================

// Helper: build college object from compact data
function col(name, slug, type, city, state, est, nirf, rating, feesMin, feesMax, exams, approvals) {
  return {
    name, slug, type, established: est, city, state,
    rating,
    totalReviews: 50 + Math.floor(Math.random() * 250),
    feesMin, feesMax,
    description: `${name} is a leading ${type.toLowerCase()} institution in ${city}, ${state}, known for quality education, research, and placements.`,
    website: `https://${slug}.ac.in`,
    approvedBy: approvals || (type === 'GOVERNMENT' ? ['AICTE', 'UGC', 'NAAC A+'] : ['AICTE', 'UGC']),
    nirfRank: nirf,
    examsAccepted: exams,
  };
}

// ===== IITs (23) — JEE Advanced =====
const iits = [
  col('Indian Institute of Technology Madras', 'iit-madras', 'GOVERNMENT', 'Chennai', 'Tamil Nadu', 1959, 1, 4.9, 200000, 1200000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology Delhi', 'iit-delhi', 'GOVERNMENT', 'New Delhi', 'Delhi', 1961, 2, 4.8, 200000, 1100000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology Bombay', 'iit-bombay', 'GOVERNMENT', 'Mumbai', 'Maharashtra', 1958, 3, 4.8, 200000, 1200000, ['JEE Advanced', 'GATE', 'CAT'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology Kanpur', 'iit-kanpur', 'GOVERNMENT', 'Kanpur', 'Uttar Pradesh', 1959, 4, 4.7, 200000, 1100000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology Kharagpur', 'iit-kharagpur', 'GOVERNMENT', 'Kharagpur', 'West Bengal', 1951, 5, 4.7, 200000, 1200000, ['JEE Advanced', 'GATE', 'CAT'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology Roorkee', 'iit-roorkee', 'GOVERNMENT', 'Roorkee', 'Uttarakhand', 1847, 6, 4.6, 200000, 1100000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology Guwahati', 'iit-guwahati', 'GOVERNMENT', 'Guwahati', 'Assam', 1994, 7, 4.5, 200000, 1000000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology Hyderabad', 'iit-hyderabad', 'GOVERNMENT', 'Hyderabad', 'Telangana', 2008, 8, 4.4, 200000, 1000000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology BHU Varanasi', 'iit-bhu', 'GOVERNMENT', 'Varanasi', 'Uttar Pradesh', 1919, 10, 4.4, 200000, 1000000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC', 'NAAC A++']),
  col('Indian Institute of Technology (ISM) Dhanbad', 'iit-ism-dhanbad', 'GOVERNMENT', 'Dhanbad', 'Jharkhand', 1926, 11, 4.3, 200000, 1000000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC', 'NAAC A+']),
  col('Indian Institute of Technology Indore', 'iit-indore', 'GOVERNMENT', 'Indore', 'Madhya Pradesh', 2009, 14, 4.3, 200000, 1000000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Gandhinagar', 'iit-gandhinagar', 'GOVERNMENT', 'Gandhinagar', 'Gujarat', 2008, 16, 4.2, 200000, 1000000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Mandi', 'iit-mandi', 'GOVERNMENT', 'Mandi', 'Himachal Pradesh', 2009, 23, 4.1, 200000, 950000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Patna', 'iit-patna', 'GOVERNMENT', 'Patna', 'Bihar', 2008, 24, 4.0, 200000, 950000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Jodhpur', 'iit-jodhpur', 'GOVERNMENT', 'Jodhpur', 'Rajasthan', 2008, 28, 4.0, 200000, 950000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Ropar', 'iit-ropar', 'GOVERNMENT', 'Rupnagar', 'Punjab', 2008, 29, 3.9, 200000, 950000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Bhubaneswar', 'iit-bhubaneswar', 'GOVERNMENT', 'Bhubaneswar', 'Odisha', 2008, 30, 3.9, 200000, 950000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Tirupati', 'iit-tirupati', 'GOVERNMENT', 'Tirupati', 'Andhra Pradesh', 2015, 43, 3.7, 200000, 900000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Palakkad', 'iit-palakkad', 'GOVERNMENT', 'Palakkad', 'Kerala', 2015, 51, 3.6, 200000, 900000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Dharwad', 'iit-dharwad', 'GOVERNMENT', 'Dharwad', 'Karnataka', 2016, 63, 3.5, 200000, 900000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Bhilai', 'iit-bhilai', 'GOVERNMENT', 'Bhilai', 'Chhattisgarh', 2016, 65, 3.5, 200000, 900000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Goa', 'iit-goa', 'GOVERNMENT', 'Ponda', 'Goa', 2016, 70, 3.4, 200000, 900000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
  col('Indian Institute of Technology Jammu', 'iit-jammu', 'GOVERNMENT', 'Jammu', 'Jammu and Kashmir', 2016, 72, 3.4, 200000, 900000, ['JEE Advanced', 'GATE'], ['AICTE', 'UGC']),
];

// ===== NITs (30) — JEE Main =====
const nits = [
  col('National Institute of Technology Tiruchirappalli', 'nit-trichy', 'GOVERNMENT', 'Tiruchirappalli', 'Tamil Nadu', 1964, 9, 4.4, 125000, 800000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Karnataka Surathkal', 'nit-surathkal', 'GOVERNMENT', 'Surathkal', 'Karnataka', 1960, 12, 4.3, 125000, 750000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Warangal', 'nit-warangal', 'GOVERNMENT', 'Warangal', 'Telangana', 1959, 13, 4.3, 125000, 750000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Calicut', 'nit-calicut', 'GOVERNMENT', 'Kozhikode', 'Kerala', 1961, 17, 4.2, 125000, 700000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Rourkela', 'nit-rourkela', 'GOVERNMENT', 'Rourkela', 'Odisha', 1961, 15, 4.2, 125000, 700000, ['JEE Main', 'GATE']),
  col('Motilal Nehru National Institute of Technology', 'mnnit-allahabad', 'GOVERNMENT', 'Prayagraj', 'Uttar Pradesh', 1961, 20, 4.1, 125000, 700000, ['JEE Main', 'GATE']),
  col('Malaviya National Institute of Technology Jaipur', 'mnit-jaipur', 'GOVERNMENT', 'Jaipur', 'Rajasthan', 1963, 25, 4.1, 125000, 700000, ['JEE Main', 'GATE']),
  col('Maulana Azad National Institute of Technology', 'manit-bhopal', 'GOVERNMENT', 'Bhopal', 'Madhya Pradesh', 1960, 40, 3.9, 125000, 650000, ['JEE Main', 'GATE']),
  col('Sardar Vallabhbhai National Institute of Technology', 'svnit-surat', 'GOVERNMENT', 'Surat', 'Gujarat', 1961, 35, 4.0, 125000, 650000, ['JEE Main', 'GATE']),
  col('Visvesvaraya National Institute of Technology', 'vnit-nagpur', 'GOVERNMENT', 'Nagpur', 'Maharashtra', 1960, 30, 4.0, 125000, 650000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Durgapur', 'nit-durgapur', 'GOVERNMENT', 'Durgapur', 'West Bengal', 1960, 45, 3.8, 100000, 600000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Silchar', 'nit-silchar', 'GOVERNMENT', 'Silchar', 'Assam', 1967, 55, 3.6, 100000, 550000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Hamirpur', 'nit-hamirpur', 'GOVERNMENT', 'Hamirpur', 'Himachal Pradesh', 1986, 60, 3.5, 100000, 550000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Kurukshetra', 'nit-kurukshetra', 'GOVERNMENT', 'Kurukshetra', 'Haryana', 1963, 32, 3.9, 125000, 650000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Srinagar', 'nit-srinagar', 'GOVERNMENT', 'Srinagar', 'Jammu and Kashmir', 1960, 70, 3.4, 100000, 500000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Jamshedpur', 'nit-jamshedpur', 'GOVERNMENT', 'Jamshedpur', 'Jharkhand', 1960, 48, 3.7, 100000, 600000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Patna', 'nit-patna', 'GOVERNMENT', 'Patna', 'Bihar', 2004, 38, 3.8, 100000, 600000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Raipur', 'nit-raipur', 'GOVERNMENT', 'Raipur', 'Chhattisgarh', 1956, 52, 3.6, 100000, 550000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Agartala', 'nit-agartala', 'GOVERNMENT', 'Agartala', 'Tripura', 1965, 68, 3.3, 80000, 500000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Meghalaya', 'nit-meghalaya', 'GOVERNMENT', 'Shillong', 'Meghalaya', 2010, 95, 3.0, 80000, 450000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Nagaland', 'nit-nagaland', 'GOVERNMENT', 'Dimapur', 'Nagaland', 2010, 100, 2.9, 80000, 450000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Manipur', 'nit-manipur', 'GOVERNMENT', 'Imphal', 'Manipur', 2010, 98, 2.9, 80000, 450000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Mizoram', 'nit-mizoram', 'GOVERNMENT', 'Aizawl', 'Mizoram', 2010, 105, 2.8, 80000, 450000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Arunachal Pradesh', 'nit-arunachal', 'GOVERNMENT', 'Yupia', 'Arunachal Pradesh', 2010, 110, 2.8, 80000, 450000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Sikkim', 'nit-sikkim', 'GOVERNMENT', 'Ravangla', 'Sikkim', 2010, 108, 2.8, 80000, 450000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Uttarakhand', 'nit-uttarakhand', 'GOVERNMENT', 'Srinagar', 'Uttarakhand', 2009, 88, 3.1, 100000, 500000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Goa', 'nit-goa', 'GOVERNMENT', 'Farmagudi', 'Goa', 2010, 80, 3.2, 100000, 500000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Delhi', 'nit-delhi', 'GOVERNMENT', 'New Delhi', 'Delhi', 2010, 42, 3.9, 100000, 600000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Puducherry', 'nit-puducherry', 'GOVERNMENT', 'Karaikal', 'Puducherry', 2010, 85, 3.1, 80000, 450000, ['JEE Main', 'GATE']),
  col('National Institute of Technology Andhra Pradesh', 'nit-andhra', 'GOVERNMENT', 'Tadepalligudem', 'Andhra Pradesh', 2015, 78, 3.2, 80000, 500000, ['JEE Main', 'GATE']),
];

// ===== IIITs (25) — JEE Main =====
const iiits = [
  col('International Institute of Information Technology Hyderabad', 'iiit-hyderabad', 'DEEMED', 'Hyderabad', 'Telangana', 1998, 18, 4.5, 300000, 1000000, ['JEE Main', 'GATE']),
  col('Indian Institute of Information Technology Allahabad', 'iiit-allahabad', 'GOVERNMENT', 'Prayagraj', 'Uttar Pradesh', 1999, 58, 4.0, 150000, 700000, ['JEE Main', 'GATE']),
  col('Indraprastha Institute of Information Technology Delhi', 'iiit-delhi', 'GOVERNMENT', 'New Delhi', 'Delhi', 2008, 46, 4.2, 300000, 900000, ['JEE Main', 'GATE']),
  col('International Institute of Information Technology Bangalore', 'iiit-bangalore', 'DEEMED', 'Bengaluru', 'Karnataka', 1999, 44, 4.2, 350000, 1200000, ['JEE Main', 'GATE']),
  col('ABV Indian Institute of Information Technology and Management Gwalior', 'iiitm-gwalior', 'GOVERNMENT', 'Gwalior', 'Madhya Pradesh', 1997, 62, 3.8, 150000, 600000, ['JEE Main', 'GATE']),
  col('IIITDM Jabalpur', 'iiitdm-jabalpur', 'GOVERNMENT', 'Jabalpur', 'Madhya Pradesh', 2005, 75, 3.6, 150000, 600000, ['JEE Main', 'GATE']),
  col('IIITDM Kancheepuram', 'iiitdm-kancheepuram', 'GOVERNMENT', 'Kancheepuram', 'Tamil Nadu', 2007, 82, 3.5, 150000, 600000, ['JEE Main', 'GATE']),
  col('Indian Institute of Information Technology Sri City', 'iiit-sricity', 'GOVERNMENT', 'Sri City', 'Andhra Pradesh', 2013, 120, 3.2, 100000, 500000, ['JEE Main']),
  col('Indian Institute of Information Technology Guwahati', 'iiit-guwahati', 'GOVERNMENT', 'Guwahati', 'Assam', 2013, 140, 3.0, 100000, 500000, ['JEE Main']),
  col('Indian Institute of Information Technology Vadodara', 'iiit-vadodara', 'GOVERNMENT', 'Vadodara', 'Gujarat', 2013, 130, 3.1, 100000, 500000, ['JEE Main']),
  col('Indian Institute of Information Technology Kota', 'iiit-kota', 'GOVERNMENT', 'Kota', 'Rajasthan', 2013, 150, 3.0, 100000, 500000, ['JEE Main']),
  col('Indian Institute of Information Technology Lucknow', 'iiit-lucknow', 'GOVERNMENT', 'Lucknow', 'Uttar Pradesh', 2015, 135, 3.1, 100000, 500000, ['JEE Main']),
  col('Indian Institute of Information Technology Dharwad', 'iiit-dharwad', 'GOVERNMENT', 'Dharwad', 'Karnataka', 2015, 148, 3.0, 100000, 500000, ['JEE Main']),
  col('Indian Institute of Information Technology Ranchi', 'iiit-ranchi', 'GOVERNMENT', 'Ranchi', 'Jharkhand', 2016, 160, 2.9, 80000, 450000, ['JEE Main']),
  col('Indian Institute of Information Technology Nagpur', 'iiit-nagpur', 'GOVERNMENT', 'Nagpur', 'Maharashtra', 2016, 145, 3.0, 100000, 500000, ['JEE Main']),
  col('Indian Institute of Information Technology Pune', 'iiit-pune', 'GOVERNMENT', 'Pune', 'Maharashtra', 2016, 142, 3.0, 100000, 500000, ['JEE Main']),
  col('Indian Institute of Information Technology Kalyani', 'iiit-kalyani', 'GOVERNMENT', 'Kalyani', 'West Bengal', 2014, 165, 2.9, 80000, 450000, ['JEE Main']),
  col('Indian Institute of Information Technology Una', 'iiit-una', 'GOVERNMENT', 'Una', 'Himachal Pradesh', 2014, 155, 2.9, 80000, 450000, ['JEE Main']),
  col('Indian Institute of Information Technology Sonepat', 'iiit-sonepat', 'GOVERNMENT', 'Sonepat', 'Haryana', 2014, 168, 2.8, 80000, 450000, ['JEE Main']),
  col('Indian Institute of Information Technology Manipur', 'iiit-manipur', 'GOVERNMENT', 'Imphal', 'Manipur', 2015, 190, 2.6, 80000, 400000, ['JEE Main']),
  col('Indian Institute of Information Technology Tiruchirappalli', 'iiit-trichy', 'GOVERNMENT', 'Tiruchirappalli', 'Tamil Nadu', 2013, 158, 2.9, 80000, 450000, ['JEE Main']),
  col('Indian Institute of Information Technology Kottayam', 'iiit-kottayam', 'GOVERNMENT', 'Kottayam', 'Kerala', 2015, 162, 2.9, 80000, 450000, ['JEE Main']),
  col('Indian Institute of Information Technology Surat', 'iiit-surat', 'GOVERNMENT', 'Surat', 'Gujarat', 2017, 170, 2.8, 80000, 450000, ['JEE Main']),
  col('Indian Institute of Information Technology Bhopal', 'iiit-bhopal', 'GOVERNMENT', 'Bhopal', 'Madhya Pradesh', 2017, 175, 2.7, 80000, 400000, ['JEE Main']),
  col('Indian Institute of Information Technology Bhagalpur', 'iiit-bhagalpur', 'GOVERNMENT', 'Bhagalpur', 'Bihar', 2017, 185, 2.6, 80000, 400000, ['JEE Main']),
];

// ===== GFTIs & Special Institutes (12) — JEE Main =====
const gftis = [
  col('Indian Institute of Engineering Science and Technology Shibpur', 'iiest-shibpur', 'GOVERNMENT', 'Howrah', 'West Bengal', 1856, 19, 4.1, 100000, 600000, ['JEE Main', 'GATE']),
  col('PEC University of Technology', 'pec-chandigarh', 'DEEMED', 'Chandigarh', 'Chandigarh', 1921, 50, 3.8, 150000, 700000, ['JEE Main', 'GATE']),
  col('Birla Institute of Technology Mesra', 'bit-mesra', 'DEEMED', 'Ranchi', 'Jharkhand', 1955, 42, 3.9, 200000, 900000, ['JEE Main', 'GATE']),
  col('Harcourt Butler Technical University', 'hbtu-kanpur', 'GOVERNMENT', 'Kanpur', 'Uttar Pradesh', 1921, 85, 3.3, 80000, 400000, ['JEE Main']),
  col('Madan Mohan Malaviya University of Technology', 'mmmut-gorakhpur', 'GOVERNMENT', 'Gorakhpur', 'Uttar Pradesh', 1962, 90, 3.2, 80000, 400000, ['JEE Main']),
  col('Sant Longowal Institute of Engineering and Technology', 'sliet-longowal', 'GOVERNMENT', 'Longowal', 'Punjab', 1989, 115, 3.0, 60000, 350000, ['JEE Main']),
  col('National Institute of Foundry and Forge Technology', 'nifft-ranchi', 'GOVERNMENT', 'Ranchi', 'Jharkhand', 1966, 125, 3.0, 80000, 400000, ['JEE Main']),
  col('Gurukula Kangri Vishwavidyalaya', 'gkv-haridwar', 'DEEMED', 'Haridwar', 'Uttarakhand', 1902, 180, 2.7, 50000, 300000, ['JEE Main']),
  col('Indian Institute of Carpet Technology', 'iict-bhadohi', 'GOVERNMENT', 'Bhadohi', 'Uttar Pradesh', 2000, 220, 2.5, 50000, 250000, ['JEE Main']),
  col('National Institute of Technology Puducherry - GFTI', 'gfti-puducherry', 'GOVERNMENT', 'Puducherry', 'Puducherry', 2010, 200, 2.6, 60000, 350000, ['JEE Main']),
  col('Mizoram University', 'mizoram-univ', 'GOVERNMENT', 'Aizawl', 'Mizoram', 2001, 210, 2.5, 40000, 300000, ['JEE Main']),
  col('Tezpur University', 'tezpur-univ', 'GOVERNMENT', 'Tezpur', 'Assam', 1994, 130, 3.0, 60000, 350000, ['JEE Main']),
];

// ===== State Government Colleges (25) — JEE Main + State Exams =====
const stateColleges = [
  col('Delhi Technological University', 'dtu-delhi', 'GOVERNMENT', 'New Delhi', 'Delhi', 1941, 33, 4.2, 150000, 800000, ['JEE Main']),
  col('Netaji Subhas University of Technology', 'nsut-delhi', 'GOVERNMENT', 'New Delhi', 'Delhi', 1983, 36, 4.1, 150000, 800000, ['JEE Main']),
  col('College of Engineering Pune', 'coep-pune', 'GOVERNMENT', 'Pune', 'Maharashtra', 1854, 34, 4.1, 100000, 500000, ['JEE Main', 'MHT-CET']),
  col('Veermata Jijabai Technological Institute', 'vjti-mumbai', 'GOVERNMENT', 'Mumbai', 'Maharashtra', 1887, 37, 4.0, 100000, 500000, ['JEE Main', 'MHT-CET']),
  col('Institute of Chemical Technology Mumbai', 'ict-mumbai', 'GOVERNMENT', 'Mumbai', 'Maharashtra', 1933, 21, 4.3, 100000, 600000, ['JEE Main', 'MHT-CET']),
  col('Jadavpur University', 'jadavpur-univ', 'GOVERNMENT', 'Kolkata', 'West Bengal', 1955, 14, 4.3, 50000, 300000, ['JEE Main', 'WBJEE']),
  col('University of Hyderabad', 'uoh-hyderabad', 'GOVERNMENT', 'Hyderabad', 'Telangana', 1974, 26, 4.0, 60000, 400000, ['JEE Main', 'TS EAMCET']),
  col('Andhra University College of Engineering', 'au-vizag', 'GOVERNMENT', 'Visakhapatnam', 'Andhra Pradesh', 1933, 75, 3.5, 50000, 350000, ['JEE Main', 'TS EAMCET']),
  col('Osmania University College of Engineering', 'ou-hyderabad', 'GOVERNMENT', 'Hyderabad', 'Telangana', 1929, 80, 3.4, 50000, 350000, ['JEE Main', 'TS EAMCET']),
  col('PSG College of Technology', 'psg-tech', 'AUTONOMOUS', 'Coimbatore', 'Tamil Nadu', 1951, 41, 4.0, 100000, 500000, ['JEE Main']),
  col('Anna University', 'anna-univ', 'GOVERNMENT', 'Chennai', 'Tamil Nadu', 1978, 22, 4.0, 60000, 400000, ['JEE Main']),
  col('Cochin University of Science and Technology', 'cusat-kochi', 'GOVERNMENT', 'Kochi', 'Kerala', 1971, 56, 3.7, 50000, 350000, ['JEE Main', 'KCET']),
  col('Jamia Millia Islamia', 'jmi-delhi', 'GOVERNMENT', 'New Delhi', 'Delhi', 1920, 27, 3.9, 80000, 400000, ['JEE Main']),
  col('Government Engineering College Thrissur', 'gec-thrissur', 'GOVERNMENT', 'Thrissur', 'Kerala', 1957, 110, 3.1, 40000, 300000, ['JEE Main', 'KCET']),
  col('Walchand College of Engineering', 'walchand-sangli', 'GOVERNMENT', 'Sangli', 'Maharashtra', 1947, 92, 3.3, 80000, 400000, ['JEE Main', 'MHT-CET']),
  col('Government College of Technology Coimbatore', 'gct-coimbatore', 'GOVERNMENT', 'Coimbatore', 'Tamil Nadu', 1945, 96, 3.2, 40000, 250000, ['JEE Main']),
  col('University Visvesvaraya College of Engineering', 'uvce-bangalore', 'GOVERNMENT', 'Bengaluru', 'Karnataka', 1917, 74, 3.5, 50000, 300000, ['JEE Main', 'KCET', 'COMEDK']),
  col('College of Engineering Trivandrum', 'cet-trivandrum', 'GOVERNMENT', 'Thiruvananthapuram', 'Kerala', 1939, 86, 3.3, 40000, 300000, ['JEE Main', 'KCET']),
  col('Bengal Engineering and Science University', 'besu-shibpur', 'GOVERNMENT', 'Howrah', 'West Bengal', 1856, 65, 3.6, 50000, 350000, ['JEE Main', 'WBJEE']),
  col('Guru Gobind Singh Indraprastha University', 'ggsipu-delhi', 'GOVERNMENT', 'New Delhi', 'Delhi', 1998, 88, 3.3, 100000, 500000, ['JEE Main']),
  col('Jawaharlal Nehru Technological University Hyderabad', 'jntu-hyderabad', 'GOVERNMENT', 'Hyderabad', 'Telangana', 1972, 78, 3.4, 50000, 350000, ['JEE Main', 'TS EAMCET']),
  col('Visvesvaraya Technological University', 'vtu-belagavi', 'GOVERNMENT', 'Belagavi', 'Karnataka', 1998, 93, 3.2, 50000, 350000, ['JEE Main', 'KCET']),
  col('Rajasthan Technical University', 'rtu-kota', 'GOVERNMENT', 'Kota', 'Rajasthan', 2006, 150, 2.8, 60000, 350000, ['JEE Main']),
  col('Uttar Pradesh Technical University', 'uptu-lucknow', 'GOVERNMENT', 'Lucknow', 'Uttar Pradesh', 2000, 160, 2.7, 60000, 350000, ['JEE Main']),
];

// ===== Top Private / Deemed Universities (35) =====
const topPrivate = [
  col('Birla Institute of Technology and Science Pilani', 'bits-pilani', 'DEEMED', 'Pilani', 'Rajasthan', 1964, 15, 4.5, 400000, 2000000, ['BITSAT']),
  col('BITS Pilani Goa Campus', 'bits-goa', 'DEEMED', 'Zuarinagar', 'Goa', 2004, 25, 4.2, 400000, 2000000, ['BITSAT']),
  col('BITS Pilani Hyderabad Campus', 'bits-hyderabad', 'DEEMED', 'Hyderabad', 'Telangana', 2008, 30, 4.1, 400000, 2000000, ['BITSAT']),
  col('Vellore Institute of Technology Vellore', 'vit-vellore', 'DEEMED', 'Vellore', 'Tamil Nadu', 1984, 11, 4.3, 200000, 1000000, ['VITEEE', 'JEE Main']),
  col('Manipal Institute of Technology', 'mit-manipal', 'DEEMED', 'Manipal', 'Karnataka', 1957, 18, 4.2, 300000, 1500000, ['JEE Main']),
  col('SRM Institute of Science and Technology', 'srm-chennai', 'DEEMED', 'Chennai', 'Tamil Nadu', 1985, 22, 4.0, 250000, 1200000, ['SRMJEEE', 'JEE Main']),
  col('Thapar Institute of Engineering and Technology', 'thapar-patiala', 'DEEMED', 'Patiala', 'Punjab', 1956, 32, 4.0, 250000, 1200000, ['JEE Main']),
  col('Kalinga Institute of Industrial Technology', 'kiit-bhubaneswar', 'DEEMED', 'Bhubaneswar', 'Odisha', 1992, 39, 3.8, 200000, 1000000, ['KIITEE', 'JEE Main']),
  col('Dhirubhai Ambani Institute of Information and Communication Technology', 'daiict-gandhinagar', 'PRIVATE', 'Gandhinagar', 'Gujarat', 2001, 55, 3.9, 200000, 900000, ['JEE Main']),
  col('PES University', 'pes-bangalore', 'DEEMED', 'Bengaluru', 'Karnataka', 1972, 60, 3.8, 300000, 1200000, ['JEE Main', 'KCET', 'COMEDK']),
  col('RV College of Engineering', 'rvce-bangalore', 'AUTONOMOUS', 'Bengaluru', 'Karnataka', 1963, 47, 4.0, 200000, 1000000, ['JEE Main', 'KCET', 'COMEDK']),
  col('BMS College of Engineering', 'bmsce-bangalore', 'AUTONOMOUS', 'Bengaluru', 'Karnataka', 1946, 54, 3.8, 200000, 900000, ['JEE Main', 'KCET', 'COMEDK']),
  col('Shiv Nadar University', 'snu-greater-noida', 'PRIVATE', 'Greater Noida', 'Uttar Pradesh', 2011, 53, 3.9, 400000, 1500000, ['JEE Main']),
  col('LNMIIT Jaipur', 'lnmiit-jaipur', 'PRIVATE', 'Jaipur', 'Rajasthan', 2002, 70, 3.6, 200000, 800000, ['JEE Main']),
  col('Nirma University', 'nirma-ahmedabad', 'PRIVATE', 'Ahmedabad', 'Gujarat', 2003, 67, 3.7, 200000, 800000, ['JEE Main', 'GUJCET']),
  col('Pandit Deendayal Energy University', 'pdeu-gandhinagar', 'PRIVATE', 'Gandhinagar', 'Gujarat', 2007, 64, 3.7, 200000, 850000, ['JEE Main', 'GUJCET']),
  col('GITAM University', 'gitam-vizag', 'DEEMED', 'Visakhapatnam', 'Andhra Pradesh', 1980, 73, 3.5, 150000, 700000, ['JEE Main']),
  col('KL University', 'kl-university', 'DEEMED', 'Guntur', 'Andhra Pradesh', 1980, 77, 3.4, 150000, 700000, ['JEE Main']),
  col('Amity University Noida', 'amity-noida', 'PRIVATE', 'Noida', 'Uttar Pradesh', 2005, 62, 3.5, 300000, 1500000, ['JEE Main']),
  col('Jaypee Institute of Information Technology', 'jiit-noida', 'DEEMED', 'Noida', 'Uttar Pradesh', 2001, 82, 3.4, 250000, 1000000, ['JEE Main']),
  col('Chandigarh University', 'cu-mohali', 'PRIVATE', 'Mohali', 'Punjab', 2012, 68, 3.5, 200000, 1000000, ['JEE Main']),
  col('Lovely Professional University', 'lpu-phagwara', 'PRIVATE', 'Phagwara', 'Punjab', 2005, 85, 3.2, 150000, 800000, ['JEE Main']),
  col('Symbiosis Institute of Technology', 'sit-pune', 'DEEMED', 'Pune', 'Maharashtra', 2008, 79, 3.4, 300000, 1200000, ['JEE Main']),
  col('MIT World Peace University', 'mitwpu-pune', 'PRIVATE', 'Pune', 'Maharashtra', 2017, 90, 3.2, 250000, 1000000, ['JEE Main', 'MHT-CET']),
  col('Ramaiah College of Engineering and Management', 'rcem-bangalore', 'AUTONOMOUS', 'Bengaluru', 'Karnataka', 1962, 95, 3.2, 200000, 900000, ['JEE Main', 'KCET', 'COMEDK']),
  col('Chitkara University', 'chitkara-rajpura', 'PRIVATE', 'Rajpura', 'Punjab', 2002, 100, 3.1, 200000, 900000, ['JEE Main']),
  col('UPES University', 'upes-dehradun', 'PRIVATE', 'Dehradun', 'Uttarakhand', 2003, 92, 3.2, 250000, 1200000, ['JEE Main']),
  col('Bennett University', 'bennett-noida', 'PRIVATE', 'Greater Noida', 'Uttar Pradesh', 2016, 88, 3.3, 350000, 1500000, ['JEE Main']),
  col('SRM University AP', 'srm-ap', 'PRIVATE', 'Amaravati', 'Andhra Pradesh', 2017, 105, 3.1, 200000, 1000000, ['JEE Main']),
  col('VIT Bhopal', 'vit-bhopal', 'PRIVATE', 'Bhopal', 'Madhya Pradesh', 2017, 110, 3.0, 200000, 1000000, ['VITEEE', 'JEE Main']),
  col('VIT AP Amaravati', 'vit-ap', 'PRIVATE', 'Amaravati', 'Andhra Pradesh', 2017, 115, 3.0, 200000, 1000000, ['VITEEE', 'JEE Main']),
  col('Manipal University Jaipur', 'muj-jaipur', 'PRIVATE', 'Jaipur', 'Rajasthan', 2011, 99, 3.2, 250000, 1200000, ['JEE Main']),
  col('Christ University', 'christ-bangalore', 'DEEMED', 'Bengaluru', 'Karnataka', 2008, 87, 3.3, 200000, 900000, ['JEE Main']),
  col('Sathyabama Institute of Science and Technology', 'sathyabama-chennai', 'DEEMED', 'Chennai', 'Tamil Nadu', 1988, 97, 3.1, 150000, 700000, ['JEE Main']),
  col('Saveetha University', 'saveetha-chennai', 'DEEMED', 'Chennai', 'Tamil Nadu', 2001, 102, 3.0, 150000, 700000, ['JEE Main']),
];

// ===== Mid-tier / Lower Private Colleges (60) — Medium to Low JEE Main ranks =====
const midTierPrivate = [
  col('JSS Science and Technology University', 'jss-mysuru', 'DEEMED', 'Mysuru', 'Karnataka', 2006, 120, 3.1, 150000, 700000, ['JEE Main', 'KCET', 'COMEDK']),
  col('Karunya Institute of Technology and Sciences', 'karunya-coimbatore', 'DEEMED', 'Coimbatore', 'Tamil Nadu', 1986, 130, 3.0, 150000, 700000, ['JEE Main']),
  col('Hindustan Institute of Technology and Science', 'hits-chennai', 'DEEMED', 'Chennai', 'Tamil Nadu', 1985, 135, 2.9, 150000, 700000, ['JEE Main']),
  col('Dayananda Sagar College of Engineering', 'dsce-bangalore', 'AUTONOMOUS', 'Bengaluru', 'Karnataka', 1979, 140, 2.9, 200000, 800000, ['JEE Main', 'KCET', 'COMEDK']),
  col('New Horizon College of Engineering', 'nhce-bangalore', 'AUTONOMOUS', 'Bengaluru', 'Karnataka', 2001, 175, 2.7, 200000, 800000, ['JEE Main', 'KCET', 'COMEDK']),
  col('Reva University', 'reva-bangalore', 'PRIVATE', 'Bengaluru', 'Karnataka', 2012, 180, 2.7, 200000, 800000, ['JEE Main', 'KCET']),
  col('Jain University', 'jain-bangalore', 'DEEMED', 'Bengaluru', 'Karnataka', 2009, 165, 2.8, 200000, 900000, ['JEE Main']),
  col('Presidency University Bangalore', 'presidency-bangalore', 'PRIVATE', 'Bengaluru', 'Karnataka', 2013, 200, 2.6, 200000, 800000, ['JEE Main']),
  col('Graphic Era Deemed University', 'graphic-era-dehradun', 'DEEMED', 'Dehradun', 'Uttarakhand', 1993, 155, 2.8, 150000, 700000, ['JEE Main']),
  col('DIT University Dehradun', 'dit-dehradun', 'PRIVATE', 'Dehradun', 'Uttarakhand', 1998, 190, 2.6, 150000, 700000, ['JEE Main']),
  col('Galgotias University', 'galgotias-noida', 'PRIVATE', 'Greater Noida', 'Uttar Pradesh', 2011, 170, 2.7, 150000, 700000, ['JEE Main']),
  col('Sharda University', 'sharda-noida', 'PRIVATE', 'Greater Noida', 'Uttar Pradesh', 2009, 185, 2.6, 200000, 800000, ['JEE Main']),
  col('GLA University', 'gla-mathura', 'PRIVATE', 'Mathura', 'Uttar Pradesh', 1998, 160, 2.8, 100000, 600000, ['JEE Main']),
  col('Mody University', 'mody-lakshmangarh', 'PRIVATE', 'Lakshmangarh', 'Rajasthan', 1998, 210, 2.5, 150000, 700000, ['JEE Main']),
  col('KIET Group of Institutions', 'kiet-ghaziabad', 'AUTONOMOUS', 'Ghaziabad', 'Uttar Pradesh', 1998, 150, 2.9, 100000, 600000, ['JEE Main']),
  col('ABES Engineering College', 'abes-ghaziabad', 'AUTONOMOUS', 'Ghaziabad', 'Uttar Pradesh', 2000, 195, 2.6, 100000, 550000, ['JEE Main']),
  col('GL Bajaj Institute of Technology and Management', 'glbajaj-noida', 'AUTONOMOUS', 'Greater Noida', 'Uttar Pradesh', 2005, 220, 2.5, 100000, 500000, ['JEE Main']),
  col('NIET Greater Noida', 'niet-noida', 'AUTONOMOUS', 'Greater Noida', 'Uttar Pradesh', 2001, 230, 2.4, 100000, 500000, ['JEE Main']),
  col('BIT Sindri', 'bit-sindri', 'GOVERNMENT', 'Dhanbad', 'Jharkhand', 1949, 145, 2.9, 50000, 300000, ['JEE Main']),
  col('MITS Gwalior', 'mits-gwalior', 'AUTONOMOUS', 'Gwalior', 'Madhya Pradesh', 1957, 155, 2.8, 80000, 400000, ['JEE Main']),
  col('Shri Govindram Seksaria Institute of Technology and Science', 'sgsits-indore', 'AUTONOMOUS', 'Indore', 'Madhya Pradesh', 1952, 148, 2.9, 80000, 400000, ['JEE Main']),
  col('Institute of Engineering and Technology Lucknow', 'iet-lucknow', 'GOVERNMENT', 'Lucknow', 'Uttar Pradesh', 1984, 140, 3.0, 50000, 300000, ['JEE Main']),
  col('LNCT Bhopal', 'lnct-bhopal', 'PRIVATE', 'Bhopal', 'Madhya Pradesh', 1994, 240, 2.4, 100000, 500000, ['JEE Main']),
  col('Techno India University', 'techno-india-kolkata', 'PRIVATE', 'Kolkata', 'West Bengal', 2012, 215, 2.5, 150000, 600000, ['JEE Main', 'WBJEE']),
  col('Heritage Institute of Technology', 'hit-kolkata', 'PRIVATE', 'Kolkata', 'West Bengal', 2001, 195, 2.6, 150000, 600000, ['JEE Main', 'WBJEE']),
  col('Institute of Engineering and Management Kolkata', 'iem-kolkata', 'PRIVATE', 'Kolkata', 'West Bengal', 1989, 165, 2.8, 150000, 600000, ['JEE Main', 'WBJEE']),
  col('Centurion University of Technology and Management', 'cutm-bhubaneswar', 'PRIVATE', 'Bhubaneswar', 'Odisha', 2010, 250, 2.3, 100000, 500000, ['JEE Main']),
  col('Siksha O Anusandhan University', 'soa-bhubaneswar', 'DEEMED', 'Bhubaneswar', 'Odisha', 1996, 125, 3.0, 150000, 700000, ['JEE Main']),
  col('CV Raman Global University', 'cgu-bhubaneswar', 'PRIVATE', 'Bhubaneswar', 'Odisha', 1997, 205, 2.5, 100000, 500000, ['JEE Main']),
  col('Vel Tech Rangarajan Dr. Sagunthala R&D Institute', 'veltech-chennai', 'DEEMED', 'Chennai', 'Tamil Nadu', 1990, 145, 2.9, 100000, 600000, ['JEE Main']),
  col('Vignan University', 'vignan-guntur', 'DEEMED', 'Guntur', 'Andhra Pradesh', 1997, 155, 2.8, 100000, 500000, ['JEE Main']),
  col('Koneru Lakshmaiah Education Foundation', 'klef-vaddeswaram', 'DEEMED', 'Vaddeswaram', 'Andhra Pradesh', 1980, 125, 3.0, 100000, 600000, ['JEE Main']),
  col('Woxsen University', 'woxsen-hyderabad', 'PRIVATE', 'Hyderabad', 'Telangana', 2014, 175, 2.7, 400000, 1500000, ['JEE Main']),
  col('Mahindra University', 'mahindra-hyderabad', 'PRIVATE', 'Hyderabad', 'Telangana', 2020, 160, 2.8, 400000, 1600000, ['JEE Main']),
  col('O.P. Jindal Global University', 'jgu-sonipat', 'PRIVATE', 'Sonipat', 'Haryana', 2009, 170, 2.8, 400000, 1500000, ['JEE Main']),
  col('Plaksha University', 'plaksha-mohali', 'PRIVATE', 'Mohali', 'Punjab', 2021, 180, 2.7, 500000, 2000000, ['JEE Main']),
  col('Ashoka University', 'ashoka-sonipat', 'PRIVATE', 'Sonipat', 'Haryana', 2014, 108, 3.2, 400000, 1500000, ['JEE Main']),
  col('BML Munjal University', 'bml-gurgaon', 'PRIVATE', 'Gurgaon', 'Haryana', 2014, 195, 2.6, 300000, 1200000, ['JEE Main']),
  col('Siddaganga Institute of Technology', 'sit-tumkur', 'AUTONOMOUS', 'Tumkur', 'Karnataka', 1963, 115, 3.1, 80000, 400000, ['JEE Main', 'KCET', 'COMEDK']),
  col('KLE Technological University', 'kle-hubli', 'DEEMED', 'Hubli', 'Karnataka', 1947, 98, 3.2, 100000, 600000, ['JEE Main', 'KCET', 'COMEDK']),
  col('MIT Academy of Engineering Pune', 'mitaoe-pune', 'AUTONOMOUS', 'Pune', 'Maharashtra', 1999, 135, 2.9, 150000, 700000, ['JEE Main', 'MHT-CET']),
  col('Vishwakarma Institute of Technology', 'vit-pune', 'AUTONOMOUS', 'Pune', 'Maharashtra', 1983, 115, 3.1, 150000, 700000, ['JEE Main', 'MHT-CET']),
  col('Pimpri Chinchwad College of Engineering', 'pccoe-pune', 'AUTONOMOUS', 'Pune', 'Maharashtra', 1999, 160, 2.8, 100000, 550000, ['JEE Main', 'MHT-CET']),
  col('Sardar Patel Institute of Technology', 'spit-mumbai', 'AUTONOMOUS', 'Mumbai', 'Maharashtra', 2005, 108, 3.1, 150000, 700000, ['JEE Main', 'MHT-CET']),
  col('KJ Somaiya College of Engineering', 'kjsce-mumbai', 'AUTONOMOUS', 'Mumbai', 'Maharashtra', 1983, 98, 3.2, 150000, 700000, ['JEE Main', 'MHT-CET']),
  col('DJ Sanghvi College of Engineering', 'djsce-mumbai', 'AUTONOMOUS', 'Mumbai', 'Maharashtra', 1994, 105, 3.1, 150000, 700000, ['JEE Main', 'MHT-CET']),
  col('Thakur College of Engineering and Technology', 'tcet-mumbai', 'AUTONOMOUS', 'Mumbai', 'Maharashtra', 2001, 185, 2.7, 120000, 600000, ['JEE Main', 'MHT-CET']),
  col('Dwarkadas J. Sanghvi College of Engineering', 'djs-mumbai', 'AUTONOMOUS', 'Mumbai', 'Maharashtra', 1994, 102, 3.1, 150000, 700000, ['JEE Main', 'MHT-CET']),
  col('Government Model Engineering College', 'mec-kochi', 'GOVERNMENT', 'Kochi', 'Kerala', 1989, 95, 3.2, 40000, 250000, ['JEE Main', 'KCET']),
  col('TKM College of Engineering', 'tkm-kollam', 'GOVERNMENT', 'Kollam', 'Kerala', 1958, 120, 3.0, 40000, 250000, ['JEE Main', 'KCET']),
  col('NIT Calicut Regional Campus', 'nitc-rc', 'GOVERNMENT', 'Kozhikode', 'Kerala', 2015, 180, 2.7, 60000, 350000, ['JEE Main']),
  col('Amrita Vishwa Vidyapeetham', 'amrita-coimbatore', 'DEEMED', 'Coimbatore', 'Tamil Nadu', 2003, 24, 4.0, 200000, 900000, ['JEE Main']),
  col('SRM Institute Chennai KTR', 'srm-ktr', 'DEEMED', 'Chennai', 'Tamil Nadu', 2002, 45, 3.8, 200000, 1000000, ['SRMJEEE', 'JEE Main']),
  col('Rajalakshmi Engineering College', 'rec-chennai', 'AUTONOMOUS', 'Chennai', 'Tamil Nadu', 1997, 150, 2.9, 100000, 500000, ['JEE Main']),
  col('Sri Sivasubramaniya Nadar College of Engineering', 'ssn-chennai', 'AUTONOMOUS', 'Chennai', 'Tamil Nadu', 1996, 48, 3.8, 150000, 600000, ['JEE Main']),
  col('Coimbatore Institute of Technology', 'cit-coimbatore', 'GOVERNMENT', 'Coimbatore', 'Tamil Nadu', 1956, 130, 3.0, 50000, 300000, ['JEE Main']),
  col('Mepco Schlenk Engineering College', 'mepco-sivakasi', 'AUTONOMOUS', 'Sivakasi', 'Tamil Nadu', 1984, 165, 2.8, 80000, 400000, ['JEE Main']),
  col('Kongu Engineering College', 'kongu-erode', 'AUTONOMOUS', 'Erode', 'Tamil Nadu', 1984, 140, 2.9, 80000, 400000, ['JEE Main']),
  col('Bannari Amman Institute of Technology', 'bait-erode', 'AUTONOMOUS', 'Erode', 'Tamil Nadu', 1996, 155, 2.8, 80000, 400000, ['JEE Main']),
  col('Kumaraguru College of Technology', 'kct-coimbatore', 'AUTONOMOUS', 'Coimbatore', 'Tamil Nadu', 1984, 120, 3.1, 100000, 500000, ['JEE Main']),
];

// ===== Assemble all colleges =====
const colleges = [...iits, ...nits, ...iiits, ...gftis, ...stateColleges, ...topPrivate, ...midTierPrivate];

// ============================================================
// GENERATION FUNCTIONS
// ============================================================

function generateCourses(collegeId, collegeType, feesMin, feesMax) {
  const engineeringCourses = [
    { name: 'B.Tech Computer Science and Engineering', degree: 'B.Tech', branch: 'Computer Science', duration: '4 years' },
    { name: 'B.Tech Electronics and Communication Engineering', degree: 'B.Tech', branch: 'Electronics', duration: '4 years' },
    { name: 'B.Tech Mechanical Engineering', degree: 'B.Tech', branch: 'Mechanical', duration: '4 years' },
    { name: 'B.Tech Electrical Engineering', degree: 'B.Tech', branch: 'Electrical', duration: '4 years' },
    { name: 'B.Tech Civil Engineering', degree: 'B.Tech', branch: 'Civil', duration: '4 years' },
    { name: 'B.Tech Chemical Engineering', degree: 'B.Tech', branch: 'Chemical', duration: '4 years' },
  ];

  const advancedCourses = [
    { name: 'B.Tech Artificial Intelligence and ML', degree: 'B.Tech', branch: 'AI & ML', duration: '4 years' },
    { name: 'B.Tech Data Science', degree: 'B.Tech', branch: 'Data Science', duration: '4 years' },
    { name: 'M.Tech Computer Science', degree: 'M.Tech', branch: 'Computer Science', duration: '2 years' },
    { name: 'MBA', degree: 'MBA', branch: 'Management', duration: '2 years' },
  ];

  // Top colleges get more courses
  const numBase = 3 + Math.floor(Math.random() * 3);
  const numAdvanced = collegeType === 'GOVERNMENT' || feesMax > 800000 ? 1 + Math.floor(Math.random() * 3) : 0;
  const shuffledBase = shuffleArray(engineeringCourses).slice(0, numBase);
  const shuffledAdvanced = shuffleArray(advancedCourses).slice(0, numAdvanced);
  const selectedCourses = [...shuffledBase, ...shuffledAdvanced];

  return selectedCourses.map((course) => {
    const feesTotal = feesMin + Math.floor(Math.random() * (feesMax - feesMin));
    return {
      collegeId,
      ...course,
      feesTotal,
      feesPerYear: Math.floor(feesTotal / parseInt(course.duration)),
      eligibility: course.degree === 'B.Tech' ? '10+2 with PCM, min 60%' : course.degree === 'M.Tech' ? 'B.Tech with valid GATE score' : 'Graduation with entrance exam',
      seats: 30 + Math.floor(Math.random() * 180),
    };
  });
}

function generatePlacements(collegeId, rating) {
  const years = [2022, 2023, 2024];
  const baseLPA = rating * 3.5;

  return years.map((year) => {
    const yearBoost = (year - 2022) * 0.5;
    const avg = Math.round((baseLPA + yearBoost + (Math.random() - 0.5) * 3) * 10) / 10;
    const highest = Math.round((avg * (2.5 + Math.random() * 3)) * 10) / 10;
    const median = Math.round((avg * (0.7 + Math.random() * 0.2)) * 10) / 10;

    const allRecruiters = ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Flipkart', 'Goldman Sachs', 'JP Morgan', 'Deloitte', 'Accenture', 'IBM', 'Oracle', 'Samsung', 'Adobe', 'Qualcomm', 'Intel', 'Cognizant', 'HCL', 'L&T'];
    const numRecruiters = 3 + Math.floor(Math.random() * 5);

    return {
      collegeId,
      year,
      averagePackage: Math.max(3, avg),
      highestPackage: Math.max(5, highest),
      medianPackage: Math.max(2.5, median),
      placementRate: Math.min(100, Math.max(50, Math.round((60 + rating * 7 + (Math.random() - 0.5) * 15) * 10) / 10)),
      topRecruiters: shuffleArray(allRecruiters).slice(0, numRecruiters),
    };
  });
}

function generateReviews(collegeId, baseRating) {
  const reviewTemplates = [
    { title: 'Amazing campus and faculty', body: 'The campus is state-of-the-art with modern labs and excellent infrastructure. Faculty members are highly qualified and approachable.' },
    { title: 'Great placement record', body: 'Placement cell is very active. Multiple companies visit campus every year. Highest packages have been consistently increasing.' },
    { title: 'Decent experience overall', body: 'Good college with reasonable fees. The curriculum could be updated but overall a good experience with decent exposure.' },
    { title: 'Needs improvement in some areas', body: 'While academics are good, the hostel facilities and food quality need significant improvement. Wi-Fi connectivity is often poor.' },
    { title: 'Transformative experience', body: 'This college changed my life. The exposure, peer group, and opportunities opened doors I never thought possible.' },
    { title: 'Good for technical skills', body: 'The labs are well-equipped and the project-based learning approach really helps. Got good hands-on experience.' },
  ];

  const names = ['Rahul S.', 'Priya M.', 'Aditya K.', 'Sneha R.', 'Arjun P.', 'Kavya D.', 'Rohit V.', 'Ananya G.'];
  const numReviews = 2 + Math.floor(Math.random() * 4);

  return Array.from({ length: numReviews }, (_, i) => {
    const template = reviewTemplates[i % reviewTemplates.length];
    const ratingVariation = baseRating + (Math.random() - 0.5) * 1.5;
    const clampedRating = Math.min(5, Math.max(1, Math.round(ratingVariation * 10) / 10));

    return {
      collegeId,
      authorName: names[i % names.length],
      rating: clampedRating,
      title: template.title,
      body: template.body,
      academicsRating: Math.min(5, Math.max(1, Math.round((clampedRating + (Math.random() - 0.5)) * 10) / 10)),
      infrastructureRating: Math.min(5, Math.max(1, Math.round((clampedRating + (Math.random() - 0.5) * 1.2) * 10) / 10)),
      placementsRating: Math.min(5, Math.max(1, Math.round((clampedRating + (Math.random() - 0.3)) * 10) / 10)),
      campusLifeRating: Math.min(5, Math.max(1, Math.round((clampedRating + (Math.random() - 0.5) * 0.8) * 10) / 10)),
      isVerified: Math.random() > 0.3,
    };
  });
}

/**
 * Generate cutoff data for the predictor.
 * Only rank-based entrance exams get cutoff rows.
 * NIRF rank drives the base closing rank:
 *   NIRF 1   → ~400       (top tier, very competitive)
 *   NIRF 50  → ~20,000    (upper-mid)
 *   NIRF 100 → ~40,000    (moderate)
 *   NIRF 200 → ~80,000    (medium-low)
 *   NIRF 250 → ~100,000   (low)
 *   No NIRF  → ~40,000–120,000 (mid-to-low tier)
 */
function generateCutoffs(collegeId, nirfRank, examsAccepted) {
  const cutoffs = [];
  const categories = ['OPEN', 'OBC', 'SC', 'ST', 'EWS'];
  const courses = ['B.Tech Computer Science', 'B.Tech Electronics', 'B.Tech Mechanical'];
  const quotas = ['AI', 'HS', 'OS'];
  const genders = ['Gender-Neutral', 'Female-only'];
  const rounds = [1, 6];

  // Skip non-rank-based exams
  const skipExams = new Set(['GATE', 'CAT', 'XAT', 'NEET']);
  const rankBasedExams = examsAccepted.filter(e => !skipExams.has(e));

  for (const exam of rankBasedExams) {
    for (const course of courses) {
      // NIRF rank drives base closing rank
      const baseRank = nirfRank
        ? nirfRank * 400 + Math.floor(Math.random() * 3000)
        : 40000 + Math.floor(Math.random() * 80000);

      for (const category of categories) {
        for (const quota of quotas) {
          for (const gender of genders) {
            for (const round of rounds) {
              const catMul = { OPEN: 1, OBC: 1.2, SC: 1.5, ST: 1.8, EWS: 1.3 }[category];
              const quotaMul = { AI: 1, HS: 1.3, OS: 0.85 }[quota];
              const genderMul = gender === 'Female-only' ? 1.4 : 1;
              const roundMul = round === 6 ? 1.15 : 1;

              const mul = catMul * quotaMul * genderMul * roundMul;
              const closingRank = Math.floor(baseRank * mul);
              const openingRank = Math.floor(closingRank * (0.05 + Math.random() * 0.1));

              cutoffs.push({
                collegeId, exam, year: 2024, category, quota, gender, round,
                courseName: course,
                openingRank,
                closingRank,
              });
            }
          }
        }
      }
    }
  }

  return cutoffs;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================================
// MAIN SEED FUNCTION
// ============================================================

async function main() {
  console.log('🌱 Starting database seed...\n');
  console.log(`📊 Total colleges to seed: ${colleges.length}\n`);

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.cutoff.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  console.log('📚 Creating colleges...\n');

  let totalCutoffs = 0;

  for (let i = 0; i < colleges.length; i++) {
    const collegeData = colleges[i];

    const college = await prisma.college.create({
      data: collegeData,
    });

    // Create courses
    const courses = generateCourses(college.id, college.type, college.feesMin, college.feesMax);
    await prisma.course.createMany({ data: courses });

    // Create placements
    const placements = generatePlacements(college.id, college.rating);
    await prisma.placement.createMany({ data: placements });

    // Create reviews
    const reviews = generateReviews(college.id, college.rating);
    await prisma.review.createMany({ data: reviews });

    // Create cutoffs for predictor
    if (college.examsAccepted.length > 0) {
      const cutoffs = generateCutoffs(college.id, college.nirfRank, college.examsAccepted);
      // Batch insert in chunks to avoid overwhelming the DB
      const CHUNK_SIZE = 500;
      for (let c = 0; c < cutoffs.length; c += CHUNK_SIZE) {
        await prisma.cutoff.createMany({ data: cutoffs.slice(c, c + CHUNK_SIZE) });
      }
      totalCutoffs += cutoffs.length;
    }

    // Progress indicator every 20 colleges
    if ((i + 1) % 20 === 0 || i === colleges.length - 1) {
      console.log(`  ✅ ${i + 1}/${colleges.length} colleges seeded (${college.name})`);
    }
  }

  // Get final counts
  const counts = {
    colleges: await prisma.college.count(),
    courses: await prisma.course.count(),
    placements: await prisma.placement.count(),
    reviews: await prisma.review.count(),
    cutoffs: await prisma.cutoff.count(),
  };

  console.log('\n📊 Seed Summary:');
  console.log(`  Colleges:   ${counts.colleges}`);
  console.log(`  Courses:    ${counts.courses}`);
  console.log(`  Placements: ${counts.placements}`);
  console.log(`  Reviews:    ${counts.reviews}`);
  console.log(`  Cutoffs:    ${counts.cutoffs}`);
  console.log('\n✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
