**การเขียน App Formula สำหรับ AppSheet **
   - initRaw:
     ```
     CONCATENATE(
     "rawbt:", 
     "//print?text=", 
     "Receipt No: ", [no],"%0A", 
     "Date: ", [date], "%0A", 
     "Time: ", [time], "%0A", 
     "----------------------------%0A"
     )
     ```

   - itemRaw:
     ```
     CONCATENATE(
     [raw], 
     INDEX([items][name], [loopno]), "%0A", 
     "(", INDEX([items][price], [loopno]), " x ", INDEX([items][qty],[loopno]), ")%09%09%09%09%09%09%09", INDEX([items][amount],[loopno]), "%0A"
     )
     ```

   - closeRaw:
     ```
     CONCATENATE(
     [raw], 
     "----------------------------%0A", 
     "Total:%09%09%09%09%09%09%09%09%09", [total], "%0A", 
     "Cash:%09%09%09%09%09%09%09%09%09%09", [cash], "%0A", 
     "change:%09%09%09%09%09%09%09%09%09", [change], "%0A", 
     "----------------------------%0AThank You%0A", 
     "%1D%56%00"
     )
     ```
