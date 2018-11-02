import numpy as np
import matplotlib.pyplot as plt
import pickle as pkl
import random
from mpl_toolkits.mplot3d import Axes3D

# Partie 1 : La planche de Galton

def bernoulli(p):
  if(random.random()<p):
    return 1
  else:
    return 0

def binomiale(n, p):
  cpt = 0
  for i in range(0,n):
    if(bernoulli(p) == 1):
      cpt += 1
  return cpt
# print(binomiale(1000, 0.5))

galton = np.zeros(10000)
n = 20
for i in range(0, 10000):
  galton[i] = binomiale(n, 0.5)

plt.hist(galton, n)
plt.show()

# Partie 2 : Visualisation d'indépendances

def normale(k, sigma):
  if k%2 == 0:
    raise ValueError('nombre pair')
  else:
    yArray = np.zeros(k)
    xArray = np.zeros(k)
    tmp = 4*sigma
    for i in range(0, k):
      x = -2*sigma + (tmp/(k-1))*i
      xArray[i] = x
      yArray[i] = (1/(sigma*np.sqrt(2*3.1459))*np.exp(-(x*x)/(2*sigma)))
    return xArray, yArray


x, y = normale(101, 1)
plt.plot(x, y)
plt.show()

def proba_affine(k ,slope):
  if k%2 == 0:
    raise ValueError('nombre pair')
  elif abs ( slope  ) > 2. / ( k * k ):
      raise ValueError ( 'la pente est trop raide : pente max = ' +
      str ( 2. / ( k * k ) ) )
  else:
    yArray = np.zeros(k)
    xArray = np.zeros(k)
    for i in range(0, k):
      yArray[i] = 1/k + (i-(k-1)/2)*slope
    return yArray

yUniform = proba_affine(101, 0.00015)
# print(np.sum(yUniform))
plt.plot(yUniform)
plt.show()

def Pxy(arr1, arr2):
  result = np.zeros(( len(arr1), len(arr2) ))
  for i in range(0, len(arr1)):
    for j in range(0, len(arr2)):
      result[i, j] = arr1[i] * arr2[j]
  return result

jointe = Pxy(y, yUniform)
# print(jointe)

def dessine ( P_jointe ):
  fig = plt.figure()
  ax = fig.add_subplot(111, projection='3d')
  x = np.linspace ( -3, 3, P_jointe.shape[0] )
  y = np.linspace ( -3, 3, P_jointe.shape[1] )
  X, Y = np.meshgrid(x, y)
  ax.plot_surface(X, Y, P_jointe, rstride=1, cstride=1 )
  ax.set_xlabel('A')
  ax.set_ylabel('B')
  ax.set_zlabel('P(A) * P(B)')
  plt.show ()

# dessine(jointe) // a decommenter
# jointeDoubleNormale = Pxy(yUniform, yUniform)

# dessine(jointeDoubleNormale)

# Partie 3 : Indépendances conditionnelles

P_XYZT = np.array([[[[ 0.0192,  0.1728],
                     [ 0.0384,  0.0096]],

                    [[ 0.0768,  0.0512],
                     [ 0.016 ,  0.016 ]]],

                   [[[ 0.0144,  0.1296],
                     [ 0.0288,  0.0072]],

                    [[ 0.2016,  0.1344],
                     [ 0.042 ,  0.042 ]]]])


#    P_XYZT[X, Y, Z, T]
s1 = P_XYZT[0, :, :, :]
s2 = P_XYZT[1, :, :, :]
ss = s1 + s2
ss1 = ss[:, :, 0]
ss2 = ss[:, :, 1]

P_YZ = ss1+ss2
# print(P_YZ[0][1])

# 1 Indépendance de X et T conditionnellement à (Y,Z)
P_XTcondYZ = P_XYZT
for x in range(0, 2):
  for y in range(0, 2):
    for z in range(0, 2):
      for t in range(0, 2):
        if(y==0):
          if(z==0):
            P_XTcondYZ[x, y, z, t] = P_XTcondYZ[x, y, z, t]/P_YZ[0, 0]
          else:
            P_XTcondYZ[x, y, z, t] = P_XTcondYZ[x, y, z, t]/P_YZ[0, 1]
        else:
          if(z==0):
            P_XTcondYZ[x, y, z, t] = P_XTcondYZ[x, y, z, t]/P_YZ[1, 0]
          else:
            P_XTcondYZ[x, y, z, t] = P_XTcondYZ[x, y, z, t]/P_YZ[1, 1]

# print(P_XTcondYZ)

# P_XcondYZ :
sp1 = P_XTcondYZ[:, :, :, 0]
sp2 = P_XTcondYZ[:, :, :, 1]
P_XcondYZ = sp1 + sp2
# print(P_XcondYZ)

# P_TcondYZ :
sp1 = P_XTcondYZ[0, :, :, :]
sp2 = P_XTcondYZ[1, :, :, :]
P_TcondYZ = sp1 + sp2

# Test d'indépendance avec une valeur :
print(P_XTcondYZ[0, 0, 0, 0])
print(P_XcondYZ[0, 0, 0] * P_TcondYZ[0, 0, 0])
# => indépendance ok pour ce test

# 2 Indépendance de X et (Y,Z)
P_XYZT = np.array([[[[ 0.0192,  0.1728],
                     [ 0.0384,  0.0096]],

                    [[ 0.0768,  0.0512],
                     [ 0.016 ,  0.016 ]]],

                   [[[ 0.0144,  0.1296],
                     [ 0.0288,  0.0072]],

                    [[ 0.2016,  0.1344],
                     [ 0.042 ,  0.042 ]]]])

p1 = P_XYZT[:, :, :, 0]
p2 = P_XYZT[:, :, :, 1]
P_XYZ = p1 + p2

p3 = P_XYZ[0, :, :]
p4 = P_XYZ[1, :, :]
P_YZ = p3 + p4

px1 = P_XYZ[:, :, 0]
px2 = P_XYZ[:, :, 1]
pxPart1 = px1 + px2
ppx1 = pxPart1[:, 0]
ppx2 = pxPart1[:, 1]
P_X = ppx1 + ppx2
# print("XYZ")
# print(P_XYZ)
# print("YZ")
# print(P_YZ)
print("X :")
print(P_X)

# Verification :
print(P_XYZ[0, 0, 0])
print(P_X[0] * P_YZ[0, 0])
# => pas indépendant

# Partie 4 : Indépendances conditionnelles et consommation mémoire
