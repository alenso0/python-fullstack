for i in range(100):
    f = open(f"pqr/pqr{i+1}.txt","w")
    f.write("This is file number"+str(i+1))
    f.write("\n ALENSO")
    f.close()