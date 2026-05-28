INSERT INTO classes (code, grade, section, name) VALUES
('1A',1,'A','Kelas 1A'),
('1B',1,'B','Kelas 1B'),
('2A',2,'A','Kelas 2A'),
('2B',2,'B','Kelas 2B'),
('3A',3,'A','Kelas 3A'),
('3B',3,'B','Kelas 3B'),
('4A',4,'A','Kelas 4A'),
('4B',4,'B','Kelas 4B'),
('5A',5,'A','Kelas 5A'),
('5B',5,'B','Kelas 5B'),
('6A',6,'A','Kelas 6A'),
('6B',6,'B','Kelas 6B')
ON CONFLICT(code) DO UPDATE SET
  grade = excluded.grade,
  section = excluded.section,
  name = excluded.name;

INSERT INTO users (username, password_hash, full_name, class_code, role) VALUES
('1a','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 1A','1A','wali_kelas'),
('1b','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 1B','1B','wali_kelas'),
('2a','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 2A','2A','wali_kelas'),
('2b','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 2B','2B','wali_kelas'),
('3a','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 3A','3A','wali_kelas'),
('3b','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 3B','3B','wali_kelas'),
('4a','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 4A','4A','wali_kelas'),
('4b','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 4B','4B','wali_kelas'),
('5a','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 5A','5A','wali_kelas'),
('5b','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 5B','5B','wali_kelas'),
('6a','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 6A','6A','wali_kelas'),
('6b','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Wali Kelas 6B','6B','wali_kelas')
ON CONFLICT(username) DO UPDATE SET
  password_hash = excluded.password_hash,
  full_name = excluded.full_name,
  class_code = excluded.class_code,
  role = excluded.role;
