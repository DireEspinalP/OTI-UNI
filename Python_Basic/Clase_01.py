# Primer Paso: Creación de variables
x1 = 2026
x2 = 0.02
x3 = "La peor clase de toda mi existencia !!!"
x4 = True
x5 = False
x6 = 666 + 999j

# Realicemos algunas operaciones triviales usando las variables de naturaleza
# x1 y x2
(x1 + 2.3 * x2) / (x2 * 0.01 * x1)

# Podemos almacenar el resultado de esa operación en una variable
y1 = (x1 + 2.3 * x2) / (x2 * 0.01 * x1)
print(y1)

# A partir de crear la variable y1 usando operaciones con las variables ya creadas (x1 y x2)
# puedo realizar operaciones con y1
y2 = (y1 * (x2 + 666)) / (0.0005)
print(y2)

y3 = (y2 * y1) * (x6 + 3.14)
print(y3)

#la parte real de la variable y3 es : 2.228

#Obs: Notquemos que la letra i NO  ES LA UNIDAD IMAGINARIA
#12+23i (error)
#Ejemplo de como se hace correctamente
12+13j # es un numero complejo, donde j es la unidad imaginaria

#Pidamos a python que nos comunique el espacio en memoria que ocupan las variables
import sys
#Cada byte es 8 bits, por lo tanto 1 byte = 8 bits
print(sys.getsizeof(x1)) # 28 bytes 
print(sys.getsizeof(x2)) # 24 bytes
print(sys.getsizeof(x3)) # 80 bytes
print(sys.getsizeof(x4)) # 28 bytes
print(sys.getsizeof(x5)) # 28 bytes
print(sys.getsizeof(x6)) # 32 bytes
print(sys.getsizeof(10**10))# 32 bytes
print(sys.getsizeof(10**100))# 72 bytes
print(sys.getsizeof(10**-x1)) # 24 bytes 
edad=18
estatura=1.75
txt="Hola soy Dire Daniel tengo {edad} años y mi estatura es de {estatura} metros".format(edad=edad, estatura=estatura)
print(txt)
print(sys.getsizeof(txt)) # 123 bytes
