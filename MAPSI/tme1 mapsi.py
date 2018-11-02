import numpy as np
import matplotlib.pyplot as plt
import pickle as pkl
import os

print(os.getcwd())

# f = open(rb'C:\Users\sylvain\Desktop\Master1\MAPSI\dataVelib.pkl')
# # Récupération des données
fname = r"C:/Users/sylvain/Desktop/Master1/MAPSI/dataVelib.pkl"
f = open(fname,'rb')
data = pkl.load(f)




# Fin du TP 1 :

# # Récupération des données
# fname = "dataVelib.pkl"
# f = open(fname,'rb')
# data = pkl.load(f)
# f.close()
# processedData = []
# for station in data:
#   if station['number']//1000 > 1 and station['number']//1000 <= 20:
#     processedData.append(station)
#
# matStations = np.zeros((len(processedData),6))
# for id, station in enumerate(processedData):
#   matStations[id][0] = station['alt']
#   matStations[id][1] = station['position']['lat']
#   matStations[id][2] = station['position']['lng']
#   matStations[id][3] = station['number']//1000
#   matStations[id][4] = station['bike_stands']
#   matStations[id][5] = station['available_bikes']
#
# # Distributions de probabilités
# pAr = np.zeros(len(processedData))
# pAl = np.zeros(len(processedData))
# # A faire sp(al, vd, vd)
# for id, station in enumerate(processedData):
#   pAr[id] = station['number']//1000
#   pAl[id] = station['alt']
#
# # res1 = plt.hist(pAr)
# res = plt.hist(pAl, 30)
# plt.show()
# plt.close()
# #Tracer un histogramme
#
# alt = res[1]
# intervalle = alt[1] - alt[0]
# pAlt = res[0]/res[0].sum()
# pAlt /= intervalle
# # print(pAlt)
# res2 = plt.bar((alt[1:]+alt[:-1])/2, pAlt, intervalle)
# plt.show()
#
# # Calcul et tracé d'une probabilité conditionnelle
# catAlt = np.floor((matStations[:,0]-matStations[:,0].min()) / intervalle)
# tablePB = np.zeros((2, 30))
# for id, station in enumerate(processedData):
#   al = int(catAlt[id]-1)
#   if station['available_bikes'] >= 2:
#     vd = 1
#     tablePB[0, al] = tablePB[0, al] + 1
#   else:
#     vd = 0
#     tablePB[1, al] = tablePB[1, al] + 1
#
# pCondAlt = np.zeros(30)
# for i in range(30):
#   v1 = tablePB[0, i]
#   v2 = tablePB[1, i]
#   pCondAlt[i] = v1/(v1+v2)
#
# pCondHist = plt.bar(np.arange(0, 30), pCondAlt, 1)
# plt.show()
#
# # Tracer la population des matStations
# x1 = matStations[:,2]
# x2 = matStations[:,1]
#
# style = [(s,c) for s in "o^+*" for c in "byrmck" ]
# for i in range(1, 21):
#   ind = np.where(matStations[:,3]==i)
#   plt.scatter(x1[ind],x2[ind],marker=style[i-1][0],c=style[i-1][1],linewidths=0)
# plt.show()
#
# # Disponibilité
#
# # stations pleines
# ind = np.where(matStations[:,4] == matStations[:,5])
# plt.scatter(x1[ind],x2[ind], c='red')
# # stations vides
# ind2 = np.where(matStations[:,5]==0)
# plt.scatter(x1[ind2],x2[ind2], c='yellow')
# # # Autres
# ind3 = np.where((matStations[:,4] != matStations[:,5]) & (matStations[:,5]!=0))
# plt.scatter(x1[ind3],x2[ind3], c='green')
# plt.show()
# # Moyenne, Médiane
# moyenne = matStations[:, 0].mean()
# ind4 = np.where(matStations[:, 0] < moyenne)
# plt.scatter(x1[ind4],x2[ind4], c='red')
# plt.show()
#
# mediane = np.median(matStations[:, 0])
# ind5 = np.where(matStations[:, 0] < mediane)
# plt.scatter(x1[ind5],x2[ind5], c='red')
# plt.show()
#
# # Correlation :
# # Entre altitude et vélo disponibles:
# moyenneAlt = matStations[:, 0].mean()
# moyenneVeloDispo = matStations[:, 5].mean()
# xi = np.zeros(len(processedData))
# yi = np.zeros(len(processedData))
# xiyi = 0
# xiCarre = 0
# yiCarre = 0
#
# for id, station in enumerate(processedData):
#   xi[id] = matStations[id, 0] - moyenneAlt
#   yi[id] = matStations[id, 5] - moyenneVeloDispo
#   xiyi += xi[id] * yi[id]
#   xiCarre += xi[id] * xi[id]
#   yiCarre += yi[id] * yi[id]
#
# correlationAltVeloDispo = xiyi / np.sqrt(xiCarre*yiCarre)
# print(correlationAltVeloDispo)
# # => Faiblement correlées
