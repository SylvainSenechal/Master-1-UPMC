import numpy as np
import matplotlib.pyplot as plt
import math
def read_file ( filename ):
    """
    Lit un fichier USPS et renvoie un tableau de tableaux d'images.
    Chaque image est un tableau de nombres réels.
    Chaque tableau d'images contient des images de la même classe.
    Ainsi, T = read_file ( "fichier" ) est tel que T[0] est le tableau
    des images de la classe 0, T[1] contient celui des images de la classe 1,
    et ainsi de suite.
    """
    # lecture de l'en-tête
    infile = open ( filename, "r" )
    nb_classes, nb_features = [ int( x ) for x in infile.readline().split() ]

    # creation de la structure de données pour sauver les images :
    # c'est un tableau de listes (1 par classe)
    data = np.empty ( 10, dtype=object )
    filler = np.frompyfunc(lambda x: list(), 1, 1)
    filler( data, data )

    # lecture des images du fichier et tri, classe par classe
    for ligne in infile:
        champs = ligne.split ()
        if len ( champs ) == nb_features + 1:
            classe = int ( champs.pop ( 0 ) )
            data[classe].append ( list ( map ( lambda x: float(x), champs ) ) )
    infile.close ()

    # transformation des list en array
    output  = np.empty ( 10, dtype=object )
    filler2 = np.frompyfunc(lambda x: np.asarray (x), 1, 1)
    filler2 ( data, output )

    return output

def display_image ( X ):
    """
    Etant donné un tableau X de 256 flotants représentant une image de 16x16
    pixels, la fonction affiche cette image dans une fenêtre.
    """
    # on teste que le tableau contient bien 256 valeurs
    if X.size != 256:
        raise ValueError ( "Les images doivent être de 16x16 pixels" )

    # on crée une image pour imshow: chaque pixel est un tableau à 3 valeurs
    # (1 pour chaque canal R,G,B). Ces valeurs sont entre 0 et 1
    Y = X / X.max ()
    img = np.zeros ( ( Y.size, 3 ) )
    for i in range ( 3 ):
        img[:,i] = X

    # on indique que toutes les images sont de 16x16 pixels
    img.shape = (16,16,3)

    # affichage de l'image
    plt.imshow( img )
    plt.show ()

training_data = read_file('train.txt')
# display_image(tab[3][4])

def learnML_class_parameters(classe):
    esperance = np.zeros(256)
    variance = np.zeros(256)
    for i in range(0, 256):
        for j in range(0, len(classe)):
            esperance[i] += classe[j][i]
        esperance[i] /= len(classe)

    for i in range(0, 256):
        for j in range(0, len(classe)):
            variance[i] += np.square(classe[j][i]-esperance[i])
        variance[i] /= len(classe)

    return esperance, variance
# esp, var = learnML_class_parameters(training_data[0])

def learnML_all_parameters(training_data):
    list = []
    for i in range (0, len(training_data)):
        esp, var = learnML_class_parameters(training_data[i])
        l = []
        l.append(esp)
        l.append(var)
        list.append(l)
    return list

parameters = learnML_all_parameters(training_data)
# print(list[1][1]) # variance nb 1

test_data = read_file('test.txt')

def log_likelihood(image, parameters):
    logVr = 0
    for i in range(0, 256):
        if(parameters[1][i] != 0):
            logVr += -0.5*np.log(2*math.pi*parameters[1][i]) - (np.square(image[i]-parameters[0][i]))/(2*parameters[1][i])
    return logVr
# [ print(log_likelihood ( test_data[0][0], parameters[i] )) for i in range ( 10 ) ]

def log_likelihoods(image, parameters):
    tab = np.zeros(10)
    for i in range(0, 10):
        tab[i] = log_likelihood(image, parameters[i])
    return tab
# res = log_likelihoods(test_data[4][1], parameters)

def classify_image(image, parameters):
    tab = log_likelihoods(image, parameters)
    return np.argmax(tab)

print(classify_image(test_data[4][1], parameters))
