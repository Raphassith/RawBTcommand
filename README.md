# RawBTcommand
การใช้งาน RawBT
<div style="white-space: break-spaces;">
การสั่งพิมพ์ใบเสร็จในรูปแบบ **Short form** ผ่าน RawBT ด้วยการใช้ URL Protocol เป็นไปได้และค่อนข้างยืดหยุ่น เนื่องจาก RawBT รองรับการทำงานผ่าน **Intent** และสามารถใช้ URL Protocol เพื่อส่งคำสั่งพิมพ์ได้โดยตรงจากแอปพลิเคชันหรือเว็บเบราว์เซอร์

### วิธีการตั้งค่าและใช้งาน
1. **ตรวจสอบการติดตั้ง RawBT:**
   - ดาวน์โหลดและติดตั้งแอป RawBT จาก [Google Play Store](https://play.google.com/store/apps/details?id=ru.a402d.rawbtprinter)

2. **ตรวจสอบว่าเครื่องพิมพ์เชื่อมต่อกับ RawBT ได้หรือไม่:**
   - เปิด RawBT และตั้งค่าเครื่องพิมพ์ของคุณ (เช่น Bluetooth หรือ USB)
   - ทดสอบพิมพ์เพื่อให้แน่ใจว่าเชื่อมต่อได้สำเร็จ

3. **สร้าง URL Protocol สำหรับการพิมพ์:**
   - RawBT ใช้รูปแบบ URL protocol `rawbt:` เพื่อรับคำสั่งพิมพ์
   - ตัวอย่างคำสั่ง:  
     ```
     rawbt://print?text=Hello%20World&align=center
     ```
     
### ตัวอย่างผลลัพธ์ที่พิมพ์
QR Code ที่มีข้อมูล "Hello World" จะปรากฏบนกระดาษ พร้อมจัดให้อยู่กึ่งกลาง

---
   - พารามิเตอร์ที่สำคัญ:
     - `text`: ข้อความที่จะพิมพ์
     - `align`: ตำแหน่งข้อความ (`left`, `center`, `right`)
     - `cut`: ส่งคำสั่งตัดกระดาษ (เช่น `cut=true`)

4. **ตัวอย่างการใช้งาน (JavaScript/HTML):**
   หากคุณมีเว็บแอป คุณสามารถใช้ `<a>` tag หรือ JavaScript เพื่อเรียก URL:
   ```html
   <a href="rawbt://print?text=Thank%20you%20for%20your%20purchase&align=center&cut=true">พิมพ์ใบเสร็จ</a>
   ```

5. **การปรับแต่งเพิ่มเติมสำหรับ Short form:**
   - คุณสามารถปรับแต่งรูปแบบข้อความได้ เช่น:
     ```
     rawbt://print?text=Order%20%23123%0AItem%20A%20x2%20-%20$10.00%0AItem%20B%20x1%20-%20$5.00%0ATotal:%20$15.00&align=left&cut=true
     ```
     - `%0A` คือการขึ้นบรรทัดใหม่

6. **เปิด URL Protocol ผ่าน Intent (ใน Android):**
   หากคุณเขียนแอป Android สามารถใช้ Intent เพื่อส่งคำสั่ง URL ได้:
   ```java
   Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("rawbt://print?text=Hello%20RawBT&align=center"));
   startActivity(intent);
   ```

ในการสร้างข้อความสำหรับการพิมพ์ผ่าน **RawBT** หรือเครื่องพิมพ์ที่ใช้ **ESC/POS Protocol** มีคำสั่งสำคัญที่ควรทราบเพื่อจัดรูปแบบข้อความ เช่น การขึ้นบรรทัดใหม่ การจัดตำแหน่ง การเพิ่มความหนาของข้อความ ฯลฯ โดยส่วนใหญ่ใช้ **ตัวอักษรพิเศษ (Escape Sequences)** และการเข้ารหัส URL

### คำสั่งพื้นฐานที่ควรรู้:
1. **%0A**: ขึ้นบรรทัดใหม่ (New Line)  
   - เทียบเท่ากับ `\n` ในภาษาโปรแกรม

2. **%20**: ช่องว่าง (Space)  
   - ใช้แทนการเว้นวรรค

3. **%09**: แท็บ (Tab)  
   - ใช้จัดตำแหน่งข้อมูล เช่น รายการสินค้า

4. **%1B%45**: เปิดโหมดตัวหนา (Bold On)  
   - ใช้เพื่อทำให้ข้อความเด่น เช่น ชื่อหัวข้อ
   - หากต้องปิดให้ใช้ `%1B%46` (Bold Off)

5. **%1B%21**: ตั้งค่าขนาดตัวอักษร  
   - `%1B%21%01`: ข้อความปกติ  
   - `%1B%21%10`: ตัวอักษรสูง 2 เท่า  
   - `%1B%21%20`: ตัวอักษรกว้าง 2 เท่า  
   - `%1B%21%30`: ตัวอักษรทั้งสูงและกว้าง 2 เท่า  

6. **%1B%61**: การจัดตำแหน่ง (Alignment)  
   - `%1B%61%00`: จัดชิดซ้าย  
   - `%1B%61%01`: จัดกึ่งกลาง  
   - `%1B%61%02`: จัดชิดขวา  

7. **%1D%56**: คำสั่งตัดกระดาษ (Cut Paper)  
   - `%1D%56%00`: ตัดกระดาษแบบเต็ม  
   - `%1D%56%01`: ตัดกระดาษแบบบางส่วน  

8. **%1B%2D**: ขีดเส้นใต้ (Underline)  
   - `%1B%2D%01`: เปิดเส้นใต้  
   - `%1B%2D%00`: ปิดเส้นใต้  

9. **%1B%7B**: ตัวอักษรกลับหัว (Upside-Down Text)  
   - `%1B%7B%01`: เปิดโหมดกลับหัว  
   - `%1B%7B%00`: ปิดโหมดกลับหัว  

10. **%1B%70**: คำสั่งเปิดลิ้นชักเก็บเงิน (Cash Drawer)  
    - `%1B%70%00%19%FA`: เปิดลิ้นชัก

---

### ตัวอย่างข้อความพร้อมคำสั่ง:
```
rawbt://print?text=%1B%61%01Welcome%20to%20My%20Shop%0A%1B%45Order%20%23123%0A%1B%61%00%0AItem%20A%20x2%20-%20%2410.00%0AItem%20B%20x1%20-%20%245.00%0A%0A%1B%61%01Total:%20%2415.00%0A%1D%56%00
```

- **คำสั่งที่ใช้:**
  - `%1B%61%01`: จัดกึ่งกลาง
  - `%1B%45`: เปิดตัวหนา
  - `%1D%56%00`: ตัดกระดาษ

---

### เครื่องมือช่วยสร้างข้อความ:
- หากต้องการหลีกเลี่ยงการเขียนรหัสเอง คุณสามารถใช้ **Text-to-ESC/POS Encoder** เพื่อแปลงข้อความเป็นโค้ดที่พร้อมใช้งาน เช่น [ESC/POS Generator Tools](https://escpos.net/tools) หรือพัฒนาโปรแกรมเล็ก ๆ เพื่อทำให้กระบวนการนี้ง่ายขึ้น

จากที่คุณระบุมา นี่คือตัวอย่างคำสั่งสำหรับพิมพ์ด้วย RawBT ผ่าน URL Protocol โดยใช้คำสั่ง ESC/POS เพื่อจัดข้อความในรูปแบบที่ต้องการ:

### คำสั่ง URL สำหรับ RawBT
```plaintext
rawbt://print?text=%1B%61%01No.%200001%0A%1B%61%00Item%201%20%09%0920.00%0AItem%202%20%09%0915.00%0A%1B%45Total%20%09%0935.00%1B%46%0A%1B%2D%01--------------------------------%1B%2D%00%0A%1B%61%01Thank%20You%0A
```

---

### อธิบายคำสั่ง
1. **จัดข้อความ "No. 0001" ให้อยู่กึ่งกลาง:**
   - `%1B%61%01`: จัดกึ่งกลาง
   - `%0A`: ขึ้นบรรทัดใหม่

2. **ข้อความ "Item 1" ชิดซ้าย และ "20.00" ชิดขวา:**
   - ใช้ `%09` (Tab) เพื่อเว้นระยะ
   - `%1B%61%00`: จัดข้อความชิดซ้าย

3. **ข้อความ "Item 2" ชิดซ้าย และ "15.00" ชิดขวา:**
   - ลักษณะเหมือนกับ Item 1

4. **ข้อความ "Total" ชิดซ้าย และ "35.00" ชิดขวา:**
   - `%1B%45`: เปิดโหมดตัวหนา
   - `%1B%46`: ปิดโหมดตัวหนา

5. **สร้างเส้นขีดทั้งบรรทัด:**
   - `%1B%2D%01`: เปิดโหมดขีดเส้นใต้
   - `%1B%2D%00`: ปิดโหมดขีดเส้นใต้

6. **ข้อความ "Thank You" อยู่กึ่งกลาง:**
   - ใช้ `%1B%61%01` อีกครั้ง

---

### ตัวอย่างผลลัพธ์ที่พิมพ์:
```
           No. 0001

Item 1                          20.00
Item 2                          15.00
Total                           35.00
--------------------------------
           Thank You
```

### คำสั่ง URL สำหรับ RawBT
```plaintext
rawbt://print?text=%1B%61%01No.%200001%0A%1B%61%00Item%201%20%09%0960.00%0AItem%202%20%09%0945.00%0A%1B%45Total%20%09%09105.00%1B%46%0A%1B%2D%01--------------------------------%1B%2D%00%0A%1B%61%01Thank%20You%0A
```

---

### อธิบายการเปลี่ยนแปลง
1. **ราคา Item 1:** เปลี่ยนจาก `20.00` เป็น `60.00`
2. **ราคา Item 2:** เปลี่ยนจาก `15.00` เป็น `45.00`
3. **Total:** เปลี่ยนจาก `35.00` เป็น `105.00`

---

### ตัวอย่างผลลัพธ์ที่พิมพ์:
```
           No. 0001

Item 1                          60.00
Item 2                          45.00
Total                          105.00
--------------------------------
           Thank You
```



คำสั่ง ESC/POS สำหรับพิมพ์เฉพาะ QR Code ที่มีข้อมูลว่า **Hello** โดยใช้ RawBT:

---

### คำสั่ง RawBT URL
```plaintext
rawbt://print?text=%1B%61%01%1D%28k%03%00%31%43%06%1D%28k%03%00%31%45%30%1D%28k%0A%00%31%50%30Hello%1D%28k%03%00%31%51%30
```

---

### อธิบายคำสั่ง
1. **จัดกึ่งกลาง QR Code:**
   - `%1B%61%01`: จัดข้อความให้อยู่กึ่งกลาง

2. **กำหนดขนาดโมดูล (Module Size):**
   - `%1D%28k%03%00%31%43%06`: กำหนดขนาดโมดูลเป็น 6 (ปรับได้ระหว่าง 1-16 ขึ้นอยู่กับเครื่องพิมพ์)

3. **กำหนดระดับความทนทานข้อผิดพลาด (Error Correction Level):**
   - `%1D%28k%03%00%31%45%30`: ตั้งค่าเป็น "L" (ต่ำสุด)

4. **เพิ่มข้อมูล QR Code (Hello):**
   - `%1D%28k%0A%00%31%50%30Hello`: ใส่ข้อมูล "Hello" (ปรับความยาวของ `%0A` ตามจำนวนตัวอักษรในข้อมูล)

5. **สั่งพิมพ์ QR Code:**
   - `%1D%28k%03%00%31%51%30`: สั่งพิมพ์ QR Code

---

### หมายเหตุ
- หากต้องการเปลี่ยนขนาด QR Code ให้ปรับค่าหลัง `%1D%28k%03%00%31%43` (เช่น เปลี่ยน `06` เป็น `08` เพื่อให้ QR Code ใหญ่ขึ้น)
- สามารถใส่ข้อความยาวขึ้นในส่วน "Hello" โดยปรับความยาว (`%0A`) ให้สอดคล้องกับข้อมูล

</div>
